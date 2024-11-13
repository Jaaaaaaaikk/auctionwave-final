// ~/server/middleware/socket.middleware.js
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io;

// Helper function to manually parse cookies from a cookie string
function parseCookies(cookieString) {
    return cookieString
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [key, val]) => {
            acc[key.trim()] = decodeURIComponent(val);
            return acc;
        }, {});
}

export default defineEventHandler((event) => {
    if (!io) {
        console.log('Initializing Socket.IO');

        io = new Server(event.node.res.socket?.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            }
        });

        io.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);

            // Access cookies from the WebSocket handshake headers
            const cookieString = socket.handshake.headers.cookie || '';
            const cookies = parseCookies(cookieString);
            const token = cookies.accessToken; // Retrieve the access token

            if (!token) {
                console.warn('Unauthorized access attempt without token');
                socket.disconnect();
                return;
            }

            try {
                // Verify the JWT using the server's secret
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decodedToken.userId; // Adjust based on JWT structure
                const userType = decodedToken.userType;
                const userLocation = decodedToken.user_Location;

                // Join the user to their specific room based on userId
                socket.join(`user-${userId}`);
                console.log(`User ${userId} joined room: user-${userId}`);

                // Log additional details if needed
                console.log(`User details - ID: ${userId}, Type: ${userType}, Location: ${userLocation}`);

            } catch (error) {
                console.error('Invalid token:', error);
                socket.disconnect(); // Disconnect if token verification fails
                return;
            }

            // Listen for send-message events and target specific users
            socket.on('send-message', (data) => {
                const { recipientId, message } = data;
                console.log(`Sending message to user-${recipientId}:`, message);

                // Emit the message only to the intended recipient's room
                io.to(`user-${recipientId}`).emit('message-channel', message);
            });

            // Listen for notification-message events and target specific users
            socket.on('notification-message', (notificationData) => {
                console.log(`Received notification for user-${notificationData.recipientId}:`, notificationData);

                // Emit the message only to the intended recipient's room
                io.to(`user-${notificationData.recipientId}`).emit('notification-channel', notificationData);
            });

            // Listen for bid-message events and target specific users
            socket.on('bid-message', (bidData) => {
                console.log(`Sending bid message to user-${bidData.recipientId}:`, bidData);

                // Emit the message only to the intended recipient's room
                io.to(`user-${bidData.recipientId}`).emit('bid-channel', bidData);
            });

            // Listen for offer-message events and target specific users
            socket.on('offer-message', (offerData) => {
                console.log(`Sending offer message to user-${offerData.recipientId}:`, offerData);

                io.to(`user-${offerData.recipientId}`).emit('offer-channel', offerData);
            });

            // Listen for system-message events and target specific users
            socket.on('system-message', (notificationData) => {
                console.log(`Forwarding system notification to user-${notificationData.recipientId}:`, notificationData);

                io.to(`user-${notificationData.recipientId}`).emit('system-channel', notificationData);
            });

            // Listen for response-message events and target specific users
            socket.on('response-message', (responseData) => {
                console.log(`Forwarding system notification to user-${responseData.recipientId}:`, responseData);

                io.to(`user-${responseData.recipientId}`).emit('response-channel', responseData);
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    }
    // Attach io to event.context so other API endpoints can use it
    event.context.appSocket = io;
});
