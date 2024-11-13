import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { ref } from 'vue';

export const useInboxSocketStore = defineStore('inbox-socket', () => {
    const socket = ref(null);

    // Initialize WebSocket connection
    const connectSocket = () => {
        if (!socket.value) {
            socket.value = io(`${location.origin}`, { transports: ['websocket'] });

            socket.value.on('connect', () => {
                console.log('Connected to WebSocket server');
            });

            // Event listener for 'message-channel' to handle received messages
            socket.value.on('message-channel', (message) => {
                console.log('Received message via WebSocket:', message);
            });

            // Event listener for 'notification-channel' to handle received messages
            socket.value.on('notification-channel', (notification) => {
                console.log('Received notification via WebSocket:', notification);
            });

            // Event listener for 'bid-channel' to handle received messages
            socket.value.on('bid-channel', (bidNotification) => {
                console.log('Received bid notification via WebSocket:', bidNotification);
            });

            // Event listener for 'bid-channel' to handle received messages
            socket.value.on('offer-channel', (offerNotification) => {
                console.log('Received offer notification via WebSocket:', offerNotification);
            });

            // Event listener for 'system-channel' to handle received messages
            socket.value.on('system-channel', (notificationMessage) => {
                console.log('Received notification from auctionwave system via WebSocket:', notificationMessage);
            });

            // Event listener for 'response-channel' to handle received messages
            socket.value.on('response-channel', (responseNotificationMessage) => {
                console.log('Received notification via WebSocket:', responseNotificationMessage);
            });

            // Event listener for 'outbid-channel' to handle received messages
            socket.value.on('outbid-channel', (outbidNotificationMessage) => {
                console.log('Received notification via WebSocket:', outbidNotificationMessage);
            });
        }
    };


    // Emit message to 'message-channel'
    const emitMessage = (messageData) => {
        if (socket.value) {
            socket.value.emit('message-channel', messageData);
        }
    };

    // Emit notificationMessage to 'notification-channel'
    const emitNotificationMessage = (notificationMessageData) => {
        if (socket.value) {
            socket.value.emit('notification-channel', notificationMessageData);
        }
    };

    // Emit notificationMessage to 'bid-channel'
    const emitBidNotificationMessage = (bidNotificationMessageData) => {
        if (socket.value) {
            socket.value.emit('bid-channel', bidNotificationMessageData);
        }
    };

    // Emit notificationMessage to 'offer-channel'
    const emitOfferNotificationMessage = (offerNotificationMessageData) => {
        if (socket.value) {
            socket.value.emit('offer-channel', offerNotificationMessageData);
        }
    };

    // Emit notificationMessage to 'system-channel'
    const emitSystemNotificationMessage = (systemNotificationMessageData) => {
        if (socket.value) {
            socket.value.emit('system-channel', systemNotificationMessageData);
        }
    };

    // Emit notificationMessage to 'response-channel'
    const emitResponseNotificationMessage = (responseNotificationMessageData) => {
        if (socket.value) {
            socket.value.emit('response-channel', responseNotificationMessageData);
        }
    };

    // Emit notificationMessage to 'outbid-channel'
    const emitOutbidResponseNotificationMessage = (outbidResponseNotificationMessageData) => {
        if (socket.value) {
            socket.value.emit('outbid-channel', outbidResponseNotificationMessageData);
        }
    };

    // Disconnect the socket when needed
    const disconnectSocket = () => {
        if (socket.value) {
            socket.value.disconnect();
            socket.value = null;
            console.log('Disconnected to WebSocket server');
        }
    };

    return {
        socket,
        connectSocket,
        emitMessage,
        emitNotificationMessage,
        emitBidNotificationMessage,
        emitOfferNotificationMessage,
        emitSystemNotificationMessage,
        emitResponseNotificationMessage,
        emitOutbidResponseNotificationMessage,
        disconnectSocket,
    };
});
