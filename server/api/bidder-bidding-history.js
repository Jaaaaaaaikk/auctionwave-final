import { defineEventHandler, getCookie, createError } from "h3";
import { getPool } from "../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  let userId;
  try {
    // Retrieve the access token from cookies
    const token = getCookie(event, "accessToken");

    if (!token) {
      // No token found, return an unauthorized error
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    userId = decoded.userId;
    console.log('Decoded User ID:', userId); // Debug: Check decoded user ID
  } catch (err) {
    console.error('JWT Verification Error:', err); // Debug: Check JWT verification errors
    throw createError({
      statusCode: 401,
      message: 'Invalid token',
    });
  }

  // Create the base query to fetch unique auctions based on user participation
  let query = `
    SELECT 
      al.name AS auctionName,
      MAX(b.bid_time) AS date,
      al.status AS status,
      al.bidding_type AS biddingType,
      al.uuid AS auction_uuid
    FROM AuctionListings al
    LEFT JOIN Bids b ON al.listing_id = b.listing_id 
    LEFT JOIN AuctionVisits av ON b.bidder_id = av.bidder_id
    WHERE av.bidder_id = 12
    
    GROUP BY al.listing_id
    
        UNION ALL
    
    SELECT 
      al.name AS auctionName,
      MAX(o.offer_time) AS date,
      al.status AS status,
      al.bidding_type AS biddingType,
      al.uuid AS auction_uuid
    FROM AuctionListings al
    LEFT JOIN Offers o ON al.listing_id = o.listing_id 
    LEFT JOIN AuctionVisits av ON o.bidder_id = av.bidder_id
    WHERE av.bidder_id = 12
    
    GROUP BY al.listing_id
  `;

  const queryParams = [userId, userId]; // Using the same userId for both parts

  // Open a connection to the database
  const pool = await getPool();

  try {
    // Execute the query with the provided parameters
    const [rows] = await pool.query(query, queryParams);


    return rows;
  } catch (error) {
    console.error('Database Query Error:', error); // Debug: Check database query errors
    throw createError({
      statusCode: 500,
      message: 'Error fetching bidding history',
    });
  }
});
