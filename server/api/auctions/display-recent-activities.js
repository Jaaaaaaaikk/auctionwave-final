import { defineEventHandler, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const pool = await getPool();

    let decodedToken;
    try {
        const token = getCookie(event, "accessToken");
        if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Invalid token' });
    }

    const auctioneerId = decodedToken.userId;

    try {
        // Query for today's activities
        const [recentActivitiesToday] = await pool.query(`
            SELECT 
                U.firstname AS bidder_name,
                A.name AS auction_name,
                A.uuid AS auction_uuid,  -- Include UUID here
                O.comment AS offer_comment,
                NULL AS bid_amount,
                AV.participant_id IS NULL AS is_first_time_bidder,
                'offer' AS activity_type,
                O.offer_time AS activity_time
            FROM Offers O
            JOIN Users U ON U.user_id = O.bidder_id
            JOIN AuctionListings A ON A.listing_id = O.listing_id
            LEFT JOIN AuctionVisits AV ON AV.bidder_id = O.bidder_id AND AV.listing_id = O.listing_id
            WHERE A.auctioneer_id = ?
              AND DATE(O.offer_time) = CURDATE()
            UNION ALL
            SELECT 
                U.firstname AS bidder_name,
                A.name AS auction_name,
                A.uuid AS auction_uuid,  -- Include UUID here
                NULL AS offer_comment,
                B.bid_amount AS bid_amount,
                AV.participant_id IS NULL AS is_first_time_bidder,
                'bid' AS activity_type,
                B.bid_time AS activity_time
            FROM Bids B
            JOIN AuctionVisits AV ON AV.bidder_id = B.bidder_id
            JOIN Users U ON U.user_id = AV.bidder_id
            JOIN AuctionListings A ON A.listing_id = B.listing_id
            WHERE A.auctioneer_id = ?
              AND DATE(B.bid_time) = CURDATE()
            ORDER BY activity_time DESC
            LIMIT 5
        `, [auctioneerId, auctioneerId]);

        // Query for yesterday's activities
        const [recentActivitiesYesterday] = await pool.query(`
            SELECT 
                U.firstname AS bidder_name,
                A.name AS auction_name,
                A.uuid AS auction_uuid,  -- Include UUID here
                O.comment AS offer_comment,
                NULL AS bid_amount,
                AV.participant_id IS NULL AS is_first_time_bidder,
                'offer' AS activity_type,
                O.offer_time AS activity_time
            FROM Offers O
            JOIN Users U ON U.user_id = O.bidder_id
            JOIN AuctionListings A ON A.listing_id = O.listing_id
            LEFT JOIN AuctionVisits AV ON AV.bidder_id = O.bidder_id AND AV.listing_id = O.listing_id
            WHERE A.auctioneer_id = ?
              AND DATE(O.offer_time) = CURDATE() - INTERVAL 1 DAY
            UNION ALL
            SELECT 
                U.firstname AS bidder_name,
                A.name AS auction_name,
                A.uuid AS auction_uuid,  -- Include UUID here
                NULL AS offer_comment,
                B.bid_amount AS bid_amount,
                AV.participant_id IS NULL AS is_first_time_bidder,
                'bid' AS activity_type,
                B.bid_time AS activity_time
            FROM Bids B
            JOIN AuctionVisits AV ON AV.bidder_id = B.bidder_id
            JOIN Users U ON U.user_id = AV.bidder_id
            JOIN AuctionListings A ON A.listing_id = B.listing_id
            WHERE A.auctioneer_id = ?
              AND DATE(B.bid_time) = CURDATE() - INTERVAL 1 DAY
            ORDER BY activity_time DESC
            LIMIT 5
        `, [auctioneerId, auctioneerId]);

        // Format activities function
        const formatActivities = (activities) => activities.map(activity => {
            if (activity.activity_type === 'offer') {
                return {
                    message: activity.is_first_time_bidder
                        ? `${activity.bidder_name} offered on your auction: ${activity.auction_name}`
                        : `${activity.bidder_name} placed a new offer on your auction: ${activity.auction_name}`,
                    offerComment: activity.offer_comment,
                    activityType: activity.activity_type,
                    time: activity.activity_time,
                    auctionUuid: activity.auction_uuid  // Include UUID in response
                };
            } else if (activity.activity_type === 'bid') {
                return {
                    message: activity.is_first_time_bidder
                        ? `${activity.bidder_name} placed their first bid of ${activity.bid_amount} on your auction: ${activity.auction_name}`
                        : `${activity.bidder_name} placed a new bid of ${activity.bid_amount} on your auction: ${activity.auction_name}`,
                    bidAmount: activity.bid_amount,
                    activityType: activity.activity_type,
                    time: activity.activity_time,
                    auctionUuid: activity.auction_uuid  // Include UUID in response
                };
            }
        });

        return {
            success: true,
            recentActivitiesToday: recentActivitiesToday.length ? formatActivities(recentActivitiesToday) : [],
            recentActivitiesYesterday: recentActivitiesYesterday.length ? formatActivities(recentActivitiesYesterday) : []
        };
    } catch (error) {
        console.error("Error fetching recent activities:", error);
        throw createError({ statusCode: 500, statusMessage: "Error retrieving activities" });
    }
});
