import { defineEventHandler, readBody, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const pool = await getPool();
    const appSocket = event.context.appSocket;

    // Read request body
    const { auctionId, bidAmount } = await readBody(event);

    let decodedToken;
    try {
        // Retrieve the access token from cookies
        const token = getCookie(event, "accessToken");

        if (!token) {
            // No token found, return an unauthorized error
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Invalid token' });
    }

    const bidderId = decodedToken.userId;

    try {
        // Retrieve listing_id and auctioneer_id from UUID
        const [result] = await pool.query(
            `SELECT listing_id, auctioneer_id, name, status FROM AuctionListings WHERE uuid = ?`,
            [auctionId]
        );

        if (result.length === 0) {
            throw createError({ statusCode: 404, message: 'Auction not found' });
        }

        const listingId = result[0].listing_id;
        const auctioneerId = result[0].auctioneer_id; // Get the auctioneer ID
        const auction_name = result[0].name;
        const auctionStatus = result[0].status;

        if (auctionStatus === 'Auction Ended') {
            throw createError({ statusCode: 403, message: 'Bidding is closed as the auction has already ended.' });
        }

        // Check for current lowest bidder
        const [lowestBidResult] = await pool.query(
            `SELECT bid_id, bidder_id FROM Bids
                     WHERE listing_id = ? 
                     ORDER BY bid_amount ASC LIMIT 1`,
            [listingId]
        );

        // If there are existing bids, check if the user is the lowest bidder
        if (lowestBidResult.length > 0) {
            const lowestBidderId = lowestBidResult[0].bidder_id;
            console.log('lowestBidderId', lowestBidderId);
            if (lowestBidderId === bidderId) {
                throw createError({ statusCode: 403, message: 'You cannot place a bid as you are currently the lowest bidder.' });
            }

            const bid_id = lowestBidResult[0].bid_id;
            await pool.query(
                `UPDATE Bids SET status = 'Outbid' WHERE bid_id = ?`,
                [bid_id]
            );

            //Name of the Auctioneer who created the auction
            const [auctioneerNameResult] = await pool.query(
                `SELECT CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS auctioneer_name
                             FROM Users u
                             WHERE u.user_id = ?`,
                [auctioneerId]
            );
            const auctioneer_name = auctioneerNameResult[0].auctioneer_name;
            const notificationMessage = `From: ${auctioneer_name}: Your bid has been outbid by another bidder.`;

            // Insert notification for the bidder who are outbid
            await pool.query(
                `INSERT INTO Notifications (sender_id, receiver_id, auction_id, notification_type, message) 
             VALUES (?, ?, ?, 'Response', ?)`,
                [auctioneerId, lowestBidderId, listingId, notificationMessage]
            );

            // Emit the notification to the outbid bidder via the WebSocket
            appSocket.to(`user-${lowestBidderId}`).emit('outbid-channel', {
                recipientId: lowestBidderId,
                notification: {
                    message: notificationMessage,
                },
            });

        }


        // Attempt to get existing bid and bidder's name
        let bidderName;
        const [existingBidResult] = await pool.query(
            `SELECT b.bid_id, CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS sender_full_name
             FROM Bids b
             JOIN Users u ON b.bidder_id = u.user_id
             WHERE b.listing_id = ? AND b.bidder_id = ?`,
            [listingId, bidderId]
        );

        if (existingBidResult.length > 0) {
            bidderName = existingBidResult[0].sender_full_name;
        } else {
            // Fallback to fetch the bidder's name directly if no bids are found
            const [userResult] = await pool.query(
                `SELECT CONCAT(firstname, IFNULL(CONCAT(' ', middlename), ''), ' ', lastname) AS sender_full_name 
                 FROM Users WHERE user_id = ?`,
                [bidderId]
            );

            bidderName = userResult.length > 0 ? userResult[0].sender_full_name : null;
        }

        console.log('existingBidResult ', existingBidResult);
        // Insert bid into Bids table
        await pool.query(
            `INSERT INTO Bids (listing_id, bidder_id, bid_amount) 
             VALUES (?, ?, ?)`,
            [listingId, bidderId, bidAmount]
        );

        let message;
        if (existingBidResult.length === 0) {
            // First bid from this bidder
            message = `${auction_name}: A new bidder has placed their first bid on your auction.`;
        } else {
            // Subsequent bid
            message = `${auction_name}: A bidder has placed a new bid on your auction.`;
        }

        // Insert notification for the auctioneer about the bid
        const [notificationResult] = await pool.query(
            `INSERT INTO Notifications (sender_id, receiver_id, auction_id, notification_type, message) 
             VALUES (?, ?, ?, 'BidPlaced', ?)`,
            [bidderId, auctioneerId, listingId, message]
        );

        // Retrieve the created_at of the newly inserted notification
        const notificationId = notificationResult.insertId;
        const [createdAtResult] = await pool.query(
            `SELECT created_at, is_read FROM Notifications WHERE notification_id = ? AND is_read = false ORDER BY created_at DESC LIMIT 1`,
            [notificationId]
        );

        const [unread_count] = await pool.query(
            `SELECT COUNT(*) AS unread_count FROM Notifications WHERE receiver_id = ? AND is_read = false`,
            [auctioneerId]
        );

        const createdAt = createdAtResult[0].created_at;
        const unreadCount = unread_count[0].unread_count;

        // Format bidAmount to two decimal places for consistent display
        const formattedBidAmount = parseFloat(bidAmount).toFixed(2);

        return {
            status: 'success',
            bidder_name: bidderName,
            auctioneer_id: auctioneerId,
            listing_id: listingId,
            message,
            created_at: createdAt,
            unreadCount: unreadCount,
            bidAmount: formattedBidAmount
        };

    } catch (error) {
        // Handle database errors
        console.error('Error processing bid:', error);
        throw createError({ statusCode: 500, message: 'Internal Server Error' });
    }
});
