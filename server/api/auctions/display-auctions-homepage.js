import { defineEventHandler, createError, getQuery } from 'h3';
import { getPool } from '../../db';

export default defineEventHandler(async (event) => {
    // Extract filters from query parameters
    const { city = null, category = null } = getQuery(event);

    // Prepare the database connection
    const pool = await getPool();

    // Build the base query
    let query = `
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
    LEFT JOIN
      AuctionImages ai ON al.listing_id = ai.listing_id
    LEFT JOIN
      Users u ON al.auctioneer_id = u.user_id
    LEFT JOIN
      UserProfileImages upi ON u.user_id = upi.user_id AND upi.is_current_profile_image = TRUE
    WHERE 
      al.status = 'Auction Pending'
  `;

    // Add conditions and parameters for filtering
    const queryParams = [];

    // Filter by location (city) if provided
    if (city) {
        query += ` AND l.location_name = ?`;
        queryParams.push(city);
    }

    // Filter by category if provided
    if (category) {
        query += ` AND c.category_name = ?`;
        queryParams.push(category);
    }

    // Group by listing_id to aggregate categories and images
    query += ` GROUP BY al.listing_id LIMIT 15`;

    try {
        // Execute the query with the provided parameters
        const [rows] = await pool.query(query, queryParams);

        // Parse categories and image URLs as arrays
        rows.forEach(row => {
            row.categories = row.categories ? row.categories.split(',') : [];
            row.image_urls = row.image_urls ? row.image_urls.split(',') : [];
        });

        // Return the filtered auction listings
        return {
            listings: rows,
            totalListings: rows.length,
        };
    } catch (error) {
        console.error('Database query failed:', error);
        throw createError({
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
});
