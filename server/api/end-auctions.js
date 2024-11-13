import { defineEventHandler, createError } from 'h3';
import { getPool } from '../db';

export default defineEventHandler(async (event) => {
    try {
        const pool = await getPool();
        const appSocket = event.context.appSocket;

        // Get auctions that need to be ended
        const [auctions] = await pool.query(
            `SELECT listing_id, name FROM AuctionListings WHERE end_time <= NOW() AND status = 'Auction Pending'`
        );

        if (auctions.length === 0) {
            console.log('No auctions need to be ended.');
            return { message: 'No auctions to update.' };
        }

        for (const auction of auctions) {
            const listingId = auction.listing_id;
            const auctionName = auction.name;

            // Mark auction as 'Auction Ended'
            await pool.query(
                `UPDATE AuctionListings SET status = 'Auction Ended' WHERE listing_id = ?`,
                [listingId]
            );

            // Find the lowest bid and mark it as 'Won'
            const [lowestBid] = await pool.query(
                `SELECT bid_id, bidder_id FROM Bids WHERE listing_id = ? AND status = 'Active' ORDER BY bid_amount ASC LIMIT 1`,
                [listingId]
            );

            let winnerId = null;
            if (lowestBid.length > 0) {
                winnerId = lowestBid[0].bidder_id;
                const winnerBidId = lowestBid[0].bid_id;

                // Mark the winning bid
                await pool.query(`UPDATE Bids SET status = 'Won' WHERE bid_id = ?`, [winnerBidId]);
            }

            // Get all participants of the auction
            const [bidders] = await pool.query(
                `SELECT bidder_id FROM AuctionVisits WHERE listing_id = ?`,
                [listingId]
            );

            const createdAt = new Date();

            // Send winning message to the winner only
            if (winnerId) {
                const winnerMessage = `Congratulations! You are the winning bidder for auction "${auctionName}".`;

                // Query unread notifications count for the winner
                const [unreadCountResult] = await pool.query(
                    `SELECT COUNT(*) AS unread_count FROM Notifications WHERE receiver_id = ? AND is_read = false`,
                    [winnerId]
                );
                const unreadCount = unreadCountResult[0]?.unread_count || 0;

                const winnerNotification = {
                    sender_full_name: 'AuctionWave System',
                    auction_name: auctionName,
                    listing_id: listingId,
                    message: winnerMessage,
                    is_read: false,
                    created_at: createdAt,
                    unreadCount: unreadCount,
                };

                // Insert the winning notification
                await pool.query(
                    `INSERT INTO Notifications (receiver_id, auction_id, notification_type, message, is_read) 
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        winnerId,
                        winnerNotification.listing_id,
                        'AuctionWinner',
                        winnerNotification.message,
                        winnerNotification.is_read,
                    ]
                );

                // Emit the winning notification
                appSocket.to(`user-${winnerId}`).emit('system-channel', {
                    recipientId: winnerId,
                    notification: winnerNotification,
                });

                console.log(`Winner notification sent to user-${winnerId} for auction ${listingId}.`);
            }

            // Notify all non-winners of auction end
            for (const bidder of bidders) {
                if (bidder.bidder_id === winnerId) continue; // Skip the winner

                const message = `The auction "${auctionName}" has ended. Please check for the Auction Summary.`;

                // Query unread notifications count for each non-winner
                const [unreadCountResult] = await pool.query(
                    `SELECT COUNT(*) AS unread_count FROM Notifications WHERE receiver_id = ? AND is_read = false`,
                    [bidder.bidder_id]
                );
                const unreadCount = unreadCountResult[0]?.unread_count || 0;

                const notification = {
                    sender_full_name: 'AuctionWave System',
                    auction_name: auctionName,
                    listing_id: listingId,
                    message: message,
                    is_read: false,
                    created_at: createdAt,
                    unreadCount: unreadCount,
                };

                // Insert notification for non-winner
                await pool.query(
                    `INSERT INTO Notifications (receiver_id, auction_id, notification_type, message, is_read) 
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        bidder.bidder_id,
                        notification.listing_id,
                        'AuctionEnded',
                        notification.message,
                        notification.is_read,
                    ]
                );

                // Emit the notification for non-winner
                appSocket.to(`user-${bidder.bidder_id}`).emit('system-channel', {
                    recipientId: bidder.bidder_id,
                    notification,
                });

                console.log(`Notification sent to user-${bidder.bidder_id} for auction ${listingId}.`);
            }
        }

        return { message: 'Auction statuses updated and notifications sent to bidders.' };
    } catch (error) {
        console.error('Error ending auctions:', error);

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error: ' + error.message,
        });
    }
});
