const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Member {
  static async create({ name, email, phone, address }) {
    const id = uuidv4();
    const { rows } = await pool.query(
      `INSERT INTO members (id, name, email, phone, address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, name, email, phone, address]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    return rows[0];
  }

  static async countActiveBorrowings(id, client = pool) {
    const { rows } = await client.query(
      `SELECT COUNT(*) FROM borrowings 
       WHERE member_id = $1 AND status = 'BORROWED'`,
      [id]
    );
    return parseInt(rows[0].count);
  }
}

module.exports = Member;
