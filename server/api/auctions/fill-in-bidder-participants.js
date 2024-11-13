import { defineEventHandler, getCookie, createError } from 'h3';
import { getPool } from '../../db';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const pool = getPool();

  // Extract listing ID from query
  const listingId = event.req.url?.split('?')[1]?.split('=')[1];
  if (!listingId) {
    throw createError({ statusCode: 400, message: 'Listing ID is required' });
  }

  let decoded;
  let userId = null;
  try {
    // Get JWT token from cookie and verify it
    const token = getCookie(event, "accessToken");
    if (!token) {
      throw createError({ statusCode: 401, message: "Unauthorized" });
    }
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (error) {
    throw createError({ statusCode: 401, message: 'Invalid token' });
  }

  try {
    // Retrieve all bids for the specified auction(bidder-auction) and (auctioneer-manage-auction)
    const [biddersRows] = await pool.query(`
          SELECT 
              u.user_id,
              CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS bidder_name,
              b.bid_amount,
              b.bid_time
          FROM 
              Users u
          JOIN 
              AuctionVisits av ON u.user_id = av.bidder_id
          JOIN 
              Bids b ON b.bidder_id = av.bidder_id
          WHERE 
              av.listing_id = ?
          ORDER BY 
              b.bid_amount ASC;`, [listingId]);

    // Retrieve all bids for the specified auction(viewAuctionModal)
    const [bidderAuctionModalRows] = await pool.query(`
      SELECT 
        u.user_id,
        CONCAT(u.firstname, IFNULL(CONCAT(' ', u.middlename), ''), ' ', u.lastname) AS full_name
      FROM 
        Users u
      JOIN 
        AuctionVisits av ON u.user_id = av.bidder_id
      JOIN 
        Bids b ON b.bidder_id = av.bidder_id
      WHERE 
        av.listing_id = ?
      GROUP BY 
        u.user_id
      ORDER BY 
        MIN(b.bid_amount) ASC
    `, [listingId]);

    // Retrieve the lowest current bid for the auction
    const [lowestBidRow] = await pool.query(`
      SELECT 
          MIN(b.bid_amount) AS lowest_bid
      FROM 
          Bids b
      JOIN 
          AuctionVisits av ON b.bidder_id = av.bidder_id
      WHERE 
          av.listing_id = ?;`, [listingId]);

    const lowestBid = lowestBidRow.length > 0 ? lowestBidRow[0].lowest_bid : null;

    console.log('BidderRows', biddersRows);
    return { bidders: biddersRows, bidderAuctionModal: bidderAuctionModalRows, currentUserId: userId, lowestBid };
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Database query failed' });
  }
});
