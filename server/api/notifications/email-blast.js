import { defineEventHandler, readBody, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
    },
});

export default defineEventHandler(async (event) => {
    const pool = await getPool();
    const body = await readBody(event);
    const results = [];

    try {
        const token = getCookie(event, "accessToken");
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decodedToken.userId;

        const { auctionUuid } = body;

        // Fetch auction details by UUID
        const [[auction]] = await pool.query(
            `SELECT listing_id, auctioneer_id, name, location_id FROM AuctionListings WHERE uuid = ?`,
            [auctionUuid]
        );


        if (!auction) {
            throw createError({ statusCode: 404, message: 'Auction not found' });
        }

        const listingId = auction.listing_id;
        const location_id = auction.location_id;
        const auctioneer_id = auction.auctioneer_id;
        const auction_name = auction.name;

        // Check if an email blast log already exists for this auction
        const [[blastLogCheck]] = await pool.query(
            `SELECT COUNT(*) AS blastCount FROM Payments WHERE listing_id = ?`,
            [listingId]
        );

        if (blastLogCheck.blastCount > 0) {
            throw createError({ statusCode: 400, message: 'Email blast has already been sent for this auction.' });
        }

        // Fetch categories associated with the auction
        const [categories] = await pool.query(
            `SELECT category_id FROM AuctionListingCategories WHERE listing_id = ?`,
            [listingId]
        );

        const categoryIds = categories.map(cat => cat.category_id);

        // Fetch bidders related to those categories
        const [bidders] = await pool.query(
            `SELECT DISTINCT b.bidder_id, u.email
             FROM Bidders b
             JOIN Users u ON b.bidder_id = u.user_id
             WHERE b.category_id IN (?) AND u.location_id = ?`,
            [categoryIds, location_id]
        );

        if (bidders.length === 0) {
            throw createError({ statusCode: 404, message: 'No bidders found for the selected categories' });
        }

        // Insert email blast log to record the email blast event
        await pool.query(
            `INSERT INTO Payments (listing_id, user_id, amount,  payment_type) VALUES (?, ?, ?, ?)`,
            [listingId, user_id, 150, 'Emailblast Fee']
        );

        // Create notifications for bidders
        const notifications = bidders.map(bidder => ({
            sender_id: auctioneer_id,
            receiver_id: bidder.bidder_id,
            auction_id: listingId,
            message: `Don’t miss out! A new auction, "${auction_name}", has been created just for you. Explore it now!`,
            is_read: false
        }));

        await pool.query(
            `INSERT INTO Notifications (sender_id, receiver_id, auction_id, notification_type, message, is_read)
             VALUES ?`,
            [notifications.map(notif => [notif.sender_id, notif.receiver_id, notif.auction_id, 'EmailBlast', notif.message, notif.is_read])]
        );

        const baseUrl = process.env.BASE_URL;
        const auctionLink = `${baseUrl}/bidder/bidder-auction?id=${auctionUuid}`;

        // Send emails to bidders
        await Promise.all(bidders.map(async (bidder) => {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: bidder.email,
                    subject: `New Auction Alert: ${auction_name}`,
                    text: `Hello! A new auction, "${auction_name}", has been created just for you. Explore it now! To join, click this link: ${auctionLink}`,
                });
            } catch (emailError) {
                console.error(`Failed to send email to ${bidder.email}:`, emailError);
            }
        }));

        // Fetch notification details and unread counts for each bidder
        for (const bidder of bidders) {
            const [notificationDetails] = await pool.query(
                `SELECT a.location_id, 
                        CONCAT(auctioneer.firstname, IFNULL(CONCAT(' ', auctioneer.middlename), ''), ' ', auctioneer.lastname) AS sender_full_name, 
                        CONCAT(bidder.firstname, IFNULL(CONCAT(' ', bidder.middlename), ''), ' ', bidder.lastname) AS receiver_full_name, 
                        a.name AS auction_name, a.listing_id, n.message, n.is_read, n.created_at
                 FROM Notifications n
                 JOIN AuctionListings a ON n.auction_id = a.listing_id
                 JOIN Users auctioneer ON a.auctioneer_id = auctioneer.user_id
                 JOIN Users bidder ON n.receiver_id = bidder.user_id
                 WHERE n.receiver_id = ? AND n.auction_id = ? AND n.notification_type = 'EmailBlast'
                 ORDER BY n.created_at DESC LIMIT 1`,
                [bidder.bidder_id, listingId]
            );

            const [unreadCount] = await pool.query(
                `SELECT COUNT(*) AS unread_count FROM Notifications WHERE receiver_id = ? AND is_read = false`,
                [bidder.bidder_id]
            );

            results.push({
                bidderId: bidder.bidder_id,
                notificationDetails: notificationDetails[0],
                unreadCount: unreadCount[0].unread_count
            });
        }

        return { success: true, message: 'Notifications sent successfully', results };
    } catch (error) {
        console.error('Error processing email blast:', error);
        throw createError({ statusCode: 500, message: 'Internal server error' });
    }
});
