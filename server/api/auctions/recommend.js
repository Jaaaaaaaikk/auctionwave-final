import { defineEventHandler, getCookie, createError, getQuery } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    let decodedToken;

    try {
        const token = getCookie(event, "accessToken");

        if (!token) {
            throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
        }

        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }

    const bidderId = decodedToken.userId;
    const db = getPool();

    console.log('BIDDER ID in Recommend auction:', bidderId);

    // Get the auction ID to exclude from the query
    const query = getQuery(event);
    const auctionIdToExclude = query.auctionId;

    if (!auctionIdToExclude) {
        console.error('No auctionId provided in the query.');
        throw createError({ statusCode: 400, message: 'Missing auctionId' });
    }

    console.log('auction ID to exclude in Recommend auction:', auctionIdToExclude);
    // Fetch bidder's interested categories
    let bidderCategories;
    try {
        const [rows] = await db.query(`SELECT category_id FROM Bidders WHERE bidder_id = ?`, [bidderId]);

        if (!rows.length) {
            return [];  // Return empty if no categories found
        }

        bidderCategories = rows; // Extract rows directly
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Failed to fetch bidder categories' });
    }

    console.log('Bidder Categories:', bidderCategories);
    // Flatten the array to get category IDs
    const categoryIds = bidderCategories.map(row => row.category_id);

    // Fetch recommended auctions based on bidder's categories
    let recommendedAuctions;
    try {
        if (categoryIds.length > 0) {
            const placeholders = categoryIds.map(() => '?').join(', ');
            const query = `
                SELECT DISTINCT 
                    al.listing_id, 
                    al.name, 
                    al.description, 
                    al.starting_bid, 
                    l.location_name AS location, 
                    al.bidding_type, 
                    al.rarity, 
                    al.uuid,
                    GROUP_CONCAT(c.category_name) AS categories,
                    GROUP_CONCAT(ai.image_url) AS image_urls,
                    CONCAT(u.firstname, ' ', u.lastname) AS auctioneer_name,
                    upi.profile_image_url AS auctioneer_profile_image
                FROM 
                    AuctionListings al
                INNER JOIN 
                    AuctionListingCategories alc ON al.listing_id = alc.listing_id
                INNER JOIN 
                    Categories c ON alc.category_id = c.category_id
                INNER JOIN 
                    Locations l ON al.location_id = l.location_id
                INNER JOIN 
                    AuctionImages ai ON al.listing_id = ai.listing_id
                INNER JOIN 
                    Users u ON al.auctioneer_id = u.user_id
                LEFT JOIN 
                    UserProfileImages upi ON u.user_id = upi.user_id
                WHERE 
                    alc.category_id IN (${placeholders})
                AND 
                    al.status = 'Auction Pending'
                AND 
                    al.uuid != ?
                GROUP BY 
                    al.listing_id
                ORDER BY 
                    RAND() 
                LIMIT 8
            `;

            // Combine the category IDs with the auction ID to exclude
            const parameters = [...categoryIds, auctionIdToExclude];
            const [auctions] = await db.query(query, parameters);

            recommendedAuctions = auctions.map(row => ({
                ...row,
                categories: row.categories ? row.categories.split(',') : [],
                image_urls: row.image_urls ? row.image_urls.split(',') : [],
            }));
        } else {
            recommendedAuctions = []; // Return empty if no categoryIds are found
        }
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Failed to fetch recommended auctions' });
    }

    console.log('Recommended Auctions:', recommendedAuctions);
    return recommendedAuctions; // Return the properly structured JSON response
});
