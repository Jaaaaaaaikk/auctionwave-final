import { defineEventHandler, getCookie, createError } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const listingId = event.req.url?.split('?')[1]?.split('=')[1];

  // Retrieve the access token from cookies
  const token = getCookie(event, "accessToken");

  if (!token) {
    // No token found, return an unauthorized error
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  // Verify the JWT token
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw createError({
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }

  console.log('the listing id', listingId);
  // Connect to the database
  const pool = await getPool();

  // First, fetch the auction details to determine the bidding type
  try {
    const [auctionRows] = await pool.query(
      `SELECT bidding_type FROM AuctionListings WHERE listing_id = ?`,
      [listingId]
    );

    if (auctionRows.length === 0) {
      throw createError({
        statusCode: 404,
        message: "Auction not found",
      });
    }

    console.log('the auction rows', auctionRows);
    const biddingType = auctionRows[0].bidding_type;

    // Retrieve the count of bidders based on the auction type
    let bidderCount = 0;

    if (biddingType === 'Lowest-type') {
      const [bidRows] = await pool.query(
        `SELECT COUNT(DISTINCT bidder_id) AS bidder_count
         FROM Bids
         WHERE listing_id = ? AND status = 'Active'`,
        [listingId]
      );
      bidderCount = bidRows.length > 0 ? bidRows[0].bidder_count : 0;
    } else if (biddingType === 'Offer-type') {
      const [offerRows] = await pool.query(
        `SELECT COUNT(DISTINCT bidder_id) AS bidder_count
         FROM Offers
         WHERE listing_id = ? AND review_status IN ('Offer Pending', 'Provide More')`,
        [listingId]
      );
      bidderCount = offerRows.length > 0 ? offerRows[0].bidder_count : 0;
    }

    console.log('the auction rows', bidderCount);

    return { bidderCount };
  } catch (error) {
    console.error("Database query error:", error);
    throw createError({ statusCode: 500, message: "Server Error" });
  }
});
