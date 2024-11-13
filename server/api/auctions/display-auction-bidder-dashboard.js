import { defineEventHandler, createError, getQuery, getCookie } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  // Extract pagination and filters from query parameters
  const { biddingType = null, rarity = null, search = null, page = 1, pageSize = 12 } = getQuery(event);

  // Retrieve the access token from cookies
  const token = getCookie(event, "accessToken");

  if (!token) {
    // No token found, return an unauthorized error
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  let userLocation = '';
  let bidderCategories = [];
  let userId = '';

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userLocation = decoded.user_Location;
      userId = decoded.userId;
    } catch (err) {
      throw createError({
        statusCode: 401,
        message: 'Invalid or expired token',
      });
    }
  }

  // Fetch categories associated with the bidder
  const pool = await getPool();
  try {
    const [categoryRows] = await pool.query(`
      SELECT c.category_id
      FROM Bidders b
      INNER JOIN Categories c ON b.category_id = c.category_id
      WHERE b.bidder_id = ?`, [userId]); // Assuming user ID is in the token

    bidderCategories = categoryRows.map(row => row.category_id);
  } catch (error) {
    console.error('Database query failed:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }

  // Create the base query
  let query = `
    SELECT DISTINCT
      al.listing_id, 
      al.name,
      al.caption, 
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
      AND alc.category_id IN (?)
  `;

  // Create a list for the query parameters
  const queryParams = [bidderCategories];

  // Filter by location if provided
  if (userLocation) {
    query += ` AND l.location_id = ?`;
    queryParams.push(userLocation);
  }

  // Filter by rarity if provided
  if (rarity && rarity !== 'All') {
    query += ` AND al.rarity = ?`;
    queryParams.push(rarity);
  }

  // Filter by bidding type if provided
  if (biddingType && biddingType !== 'All') {
    query += ` AND al.bidding_type = ?`;
    queryParams.push(biddingType);
  }

  // Filter by search term if provided
  if (search) {
    query += ` AND al.name LIKE ?`;
    queryParams.push(`%${search}%`);
  }

  // Group by listing_id to aggregate categories and images
  query += ` GROUP BY al.listing_id`;

  // Add limit and offset for pagination
  const offset = (page - 1) * pageSize;
  query += ` LIMIT ? OFFSET ?`;
  queryParams.push(Number(pageSize), Number(offset));

  try {
    // Execute the query with the provided parameters
    const [rows] = await pool.query(query, queryParams);

    // Parse categories and image URLs as arrays
    rows.forEach(row => {
      row.categories = row.categories ? row.categories.split(',') : [];
      row.image_urls = row.image_urls ? row.image_urls.split(',') : [];
    });

    // Fetch the total count for pagination
    const [totalCountResult] = await pool.query(`
      SELECT COUNT(DISTINCT al.listing_id) AS total
      FROM AuctionListings al
      INNER JOIN AuctionListingCategories alc ON al.listing_id = alc.listing_id
      WHERE al.status = 'Auction Pending'
      AND alc.category_id IN (?)
    `, [bidderCategories]);

    const totalListings = totalCountResult[0]?.total || 0;

    // Return the data along with pagination info
    return {
      listings: rows,
      totalListings,
      totalPages: Math.ceil(totalListings / pageSize),
      currentPage: Number(page),
    };
  } catch (error) {
    console.error('Database query failed:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
});
