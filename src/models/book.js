const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Book {
  static async findAll({ title, author, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const params = [];
    let query = `
      SELECT *, 
        CASE WHEN stock > 0 THEN true ELSE false END as available
      FROM books
      WHERE 1=1
    `;

    if (title) {
      params.push(`%${title}%`);
      query += ` AND LOWER(title) LIKE LOWER($${params.length})`;
    }

    if (author) {
      params.push(`%${author}%`);
      query += ` AND LOWER(author) LIKE LOWER($${params.length})`;
    }

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const { rows } = await pool.query(query, params);
    const countResult = await pool.query('SELECT COUNT(*) FROM books');
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

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return rows[0];
  }

  static async updateStock(id, increment, client = pool) {
    const { rows } = await client.query(
      'UPDATE books SET stock = stock + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [increment, id]
    );
    return rows[0];
  }
}

module.exports = Book;