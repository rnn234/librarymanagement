const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Borrowing {
  static async create({ book_id, member_id }, client = pool) {
    const id = uuidv4();
    const { rows } = await client.query(
      `INSERT INTO borrowings (id, book_id, member_id, borrow_date)
       VALUES ($1, $2, $3, CURRENT_DATE)
       RETURNING *`,
      [id, book_id, member_id]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT b.*, bk.title, bk.author, bk.isbn
       FROM borrowings b
       JOIN books bk ON b.book_id = bk.id
       WHERE b.id = $1`,
      [id]
    );
    return rows[0];
  }

  static async getMemberBorrowings({ memberId, status, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const params = [memberId];
    let query = `
      SELECT b.*, bk.title, bk.author, bk.isbn
      FROM borrowings b
      JOIN books bk ON b.book_id = bk.id
      WHERE b.member_id = $1
    `;

    if (status) {
      params.push(status);
      query += ` AND b.status = $${params.length}`;
    }

    query += ` ORDER BY b.borrow_date DESC
              LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const { rows } = await pool.query(query, params);
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM borrowings WHERE member_id = $1',
      [memberId]
    );
    const total = parseInt(countResult.rows[0].count);

    return {
      data: rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = Borrowing;