import { defineEventHandler, readBody, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const pool = await getPool();

    // Read request body
    let auctionId, offerComment, imageUrls;
    const results = [];
    try {
        ({ auctionId, offerComment, imageUrls } = await readBody(event));
    } catch (error) {
        console.error('Error reading body:', error);
        throw createError({ statusCode: 400, message: 'Bad Request: Unable to parse body' });
    }

    let decodedToken;
    try {
        // Retrieve the access token from cookies
        const token = getCookie(event, "accessToken");

        if (!token) {
            console.log('No token found');
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decodedToken);
    } catch (error) {
        console.error('Token verification failed:', error);
        throw createError({ statusCode: 401, message: 'Invalid token' });
    }

    const bidderId = decodedToken.userId;
    try {
        // Retrieve listing_id and auctioneer_id from AuctionListings
        const [result] = await pool.query(
            `SELECT listing_id, auctioneer_id, name FROM AuctionListings WHERE uuid = ?`,
            [auctionId]
        );

        if (result.length === 0) {
            console.log('Auction not found for auctionId:', auctionId);
            throw createError({ statusCode: 404, message: 'Auction not found' });
        }

        const listingId = result[0].listing_id;
        const auctioneerId = result[0].auctioneer_id; // Get the auctioneer ID
        const auction_name = result[0].name;

        // Check if the bidder has already placed an offer for this auction
        const [existingOffer] = await pool.query(
            `SELECT * FROM Offers WHERE bidder_id = ? AND listing_id = ? AND review_status = 'Offer Pending' ORDER BY offer_time DESC LIMIT 1`,
            [bidderId, listingId]
        );

        // Log the existing offer for debugging
        console.log('Existing Offer:', existingOffer);

        if (existingOffer.length > 0) {
            const lastOffer = existingOffer[0];
            const reviewStatus = lastOffer.review_status;
            console.log('Last Offer Review Status:', reviewStatus);

            if (reviewStatus === 'Offer Pending') {
                // If the last offer status is 'Offer Pending', the bidder can't place a new offer
                console.log('The last offer is still pending.');
                throw createError({ statusCode: 400, message: 'You cannot place a new offer until the auctioneer reviews your previous offer.' });
            }
        }

        // Insert offer into Offers table
        const [offerResult] = await pool.query(
            `INSERT INTO Offers (listing_id, bidder_id, comment) VALUES (?, ?, ?)`,
            [listingId, bidderId, offerComment]
        );

        const offerId = offerResult.insertId;

        // Save images and insert paths into OfferImages
        if (Array.isArray(imageUrls) && imageUrls.length > 0) {
            const uploadDir = path.join(process.cwd(), 'public', 'offerimages');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const imageInsertPromises = imageUrls.slice(0, 3).map((imageBase64) => {
                const imageBuffer = Buffer.from(imageBase64.split(',')[1], 'base64'); // Decode base64 string
                const imageName = `${uuidv4()}.jpg`;
                const imagePath = path.join(uploadDir, imageName);

                fs.writeFileSync(imagePath, imageBuffer); // Save image to disk

                const imageUrl = `/offerimages/${imageName}`; // Path for database
                return pool.query(
                    `INSERT INTO OfferImages (offer_id, image_url) VALUES (?, ?)`,
                    [offerId, imageUrl]
                );
            });

            await Promise.all(imageInsertPromises);
        }

        // Prepare notification message for the auctioneer
        const message = `${auction_name}: A new offer has been placed on your auction.`;
        console.log('Notification Message:', message);

        // Insert notification for the auctioneer about the offer
        await pool.query(
            `INSERT INTO Notifications (sender_id, receiver_id, auction_id, notification_type, message) 
             VALUES (?, ?, ?, 'OfferPlaced', ?)`,
            [bidderId, auctioneerId, listingId, message]
        );

        const [notificationDetails] = await pool.query(
            `SELECT a.location_id,
                    CONCAT(auctioneer.firstname, IFNULL(CONCAT(' ', auctioneer.middlename), ''), ' ', auctioneer.lastname) AS receiver_full_name, 
                    CONCAT(bidder.firstname, IFNULL(CONCAT(' ', bidder.middlename), ''), ' ', bidder.lastname) AS sender_full_name, 
                    a.name AS auction_name, a.listing_id, n.message, n.is_read, n.created_at
             FROM Notifications n
             JOIN AuctionListings a ON n.auction_id = a.listing_id
             JOIN Users auctioneer ON n.receiver_id = auctioneer.user_id
             JOIN Users bidder ON n.sender_id = bidder.user_id
             WHERE n.receiver_id = ? AND n.sender_id = ? AND n.auction_id = ? AND n.notification_type = 'OfferPlaced'
             ORDER BY n.created_at DESC LIMIT 1`,
            [auctioneerId, bidderId, listingId]
        );

        const [unreadCount] = await pool.query(
            `SELECT COUNT(*) AS unread_count FROM Notifications WHERE receiver_id = ? AND is_read = false`,
            [auctioneerId]
        );

        // Push results into the results array
        results.push({
            auctioneerId: auctioneerId,
            notificationDetails: notificationDetails[0],
            unreadCount: unreadCount[0].unread_count
        });

        console.log('The NotificationDetails in Offer', notificationDetails);
        return { status: 'success', offerId: offerId, results }; // Return the offer ID
    } catch (error) {
        // Handle database errors
        console.error('Database error:', error);
        throw createError({ statusCode: 500, message: 'Internal Server Error' });
    }
});
