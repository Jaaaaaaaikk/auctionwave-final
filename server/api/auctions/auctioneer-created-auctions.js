import { defineEventHandler, createError, getCookie } from "h3";
import { getPool } from "../../db";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { page = 1, pageSize = 6, search = "", auctionStatus = "", paymentStatus = "", transactionStatus = "" } = getQuery(event);

  try {
    const token = getCookie(event, "accessToken");
    if (!token) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const auctioneerId = decoded.userId;
    const pool = getPool();
    const offset = (page - 1) * pageSize;

    // Start the query with the AuctionListings table
    let query = `
      SELECT al.listing_id, al.name, l.location_name, al.description, al.bidding_type, al.rarity, al.uuid, al.status, al.created_at, p.payment_status, t.transaction_status
      FROM AuctionListings al
      JOIN Locations l ON al.location_id = l.location_id
      LEFT JOIN Payments p ON al.listing_id = p.listing_id
      LEFT JOIN Transactions t ON al.listing_id = t.listing_id
      WHERE al.auctioneer_id = ?
    `;

    const queryParams = [auctioneerId];

    // Add auction status filter if specified
    if (auctionStatus) {
      query += " AND al.status = ?";
      queryParams.push(auctionStatus);
    }
    // Add payment status filter if specified
    if (paymentStatus) {
      query += " AND p.payment_status = ?";
      queryParams.push(paymentStatus);
    }

    // Add transaction status filter if specified
    if (transactionStatus) {
      query += " AND t.transaction_status = ?";
      queryParams.push(transactionStatus);
    }

    if (search) {
      query += " AND al.name LIKE ?";
      queryParams.push(`%${search}%`);
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(Number(pageSize), Number(offset));


    const [rows] = await pool.query(query, queryParams);

    // Get the total count of Pending Auctions
    const [totalPendingCountResult] = await pool.query(
      `SELECT COUNT(*) AS total 
               FROM AuctionListings al 
               WHERE al.auctioneer_id = ? AND al.status = 'Auction Pending'
                 ${search ? " AND al.name LIKE ?" : ""}`,
      search ? [auctioneerId, `%${search}%`] : [auctioneerId]
    );

    // Get the total count of Pending Cashbonds
    const [totalCashbondPendingCountResult] = await pool.query(
      `SELECT COUNT(*) AS total 
       FROM AuctionListings al 
       LEFT JOIN Payments p ON al.listing_id = p.listing_id
       WHERE al.auctioneer_id = ? AND p.payment_status = 'Payment Pending'
         ${search ? " AND al.name LIKE ?" : ""}`,
      search ? [auctioneerId, `%${search}%`] : [auctioneerId]
    );


    // Get the total count of Pending Cashbonds
    const [totalTransactionPendingCountResult] = await pool.query(
      `SELECT COUNT(*) AS total 
           FROM AuctionListings al 
           LEFT JOIN Transactions t ON al.listing_id = t.listing_id
           WHERE al.auctioneer_id = ? AND t.transaction_status = 'Transaction Pending'
             ${search ? " AND al.name LIKE ?" : ""}`,
      search ? [auctioneerId, `%${search}%`] : [auctioneerId]
    );

    // Get the total count of Pending Auctions
    let totalCountQuery = `
      SELECT COUNT(*) AS total
      FROM AuctionListings al
      JOIN Locations l ON al.location_id = l.location_id
      LEFT JOIN Payments p ON al.listing_id = p.listing_id
      LEFT JOIN Transactions t ON al.listing_id = t.listing_id
      WHERE al.auctioneer_id = ?
    `;

    const totalCountParams = [auctioneerId];

    // Reapply filters for total count
    if (auctionStatus) {
      totalCountQuery += " AND al.status = ?";
      totalCountParams.push(auctionStatus);
    }
    if (paymentStatus) {
      totalCountQuery += " AND p.payment_status = ?";
      totalCountParams.push(paymentStatus);
    }
    if (transactionStatus) {
      totalCountQuery += " AND t.transaction_status = ?";
      totalCountParams.push(transactionStatus);
    }
    if (search) {
      totalCountQuery += " AND al.name LIKE ?";
      totalCountParams.push(`%${search}%`);
    }
    const [totalResult] = await pool.query(totalCountQuery, totalCountParams);
    const totalCount = totalResult[0]?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize);
    const totalAuctionPending = totalPendingCountResult[0]?.total || 0;
    const totalCashbondPending = totalCashbondPendingCountResult[0]?.total || 0;
    const totalTransactionPending = totalTransactionPendingCountResult[0]?.total || 0;

    return {
      auctions: rows,
      totalAuctionPending,
      totalCashbondPending,
      totalTransactionPending,
      totalPages,
      currentPage: Number(page),
    };

  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});