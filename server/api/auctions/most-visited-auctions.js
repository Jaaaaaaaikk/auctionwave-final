import { defineEventHandler, createError, getQuery, getCookie } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {

  // Retrieve the access token from cookies
  const token = getCookie(event, "accessToken");

  if (!token) {
    // No token found, return an unauthorized error
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  let userLocation = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userLocation = decoded.user_Location; // location is stored in the token
    } catch (err) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token',
      });
    }
  }

  // Query to fetch all 'Auction Pending' auctions, including only those with at least 1 visit
  let query = `
    SELECT
      al.listing_id, 
      al.name, 
      al.description,
      l.location_name AS location,
      al.starting_bid,
      al.bidding_type,
      al.uuid,
      al.rarity,
      CONCAT(u.firstname, ' ', u.lastname) AS auctioneer_name,
      upi.profile_image_url AS auctioneer_profile_image,
      GROUP_CONCAT(DISTINCT c.category_name) AS categories,
      COUNT(DISTINCT av.participant_id) AS visit_count
    FROM 
      AuctionListings al 
    INNER JOIN 
      AuctionListingCategories alc ON al.listing_id = alc.listing_id
    LEFT JOIN
      Categories c ON alc.category_id = c.category_id
    LEFT JOIN 
      Locations l ON al.location_id = l.location_id
    LEFT JOIN 
      AuctionVisits av ON al.listing_id = av.listing_id
    LEFT JOIN
      Users u ON al.auctioneer_id = u.user_id
    LEFT JOIN
      UserProfileImages upi ON u.user_id = upi.user_id AND upi.is_current_profile_image = TRUE
    WHERE 
      al.status = 'Auction Pending'
      AND al.location_id = ? -- Filter by the user’s location ID
    GROUP BY al.listing_id 
    HAVING visit_count > 0  -- Only include auctions with at least one visit
    ORDER BY visit_count DESC
    LIMIT 3;
  `;

  // Open a connection to the database
  const pool = await getPool();

  try {
    // Execute the query
    const [rows] = await pool.query(query, [userLocation]);

    rows.forEach(row => {
      row.categories = row.categories ? row.categories.split(',') : [];
    });

    return {
      success: true,
      allData: rows,
    };
  } catch (error) {
    console.error('Database query failed:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
});
