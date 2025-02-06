const MemberService = require('../services/memberService');
const pool = require("../config/database");

class MemberController {
  static async createMember(req, res, next) {
    try {
      const member = await MemberService.createMember(req.body);
      res.status(201).json(member);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMembers(req, res) {
    try {
      const { name, email, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const params = [];

      let query = `SELECT * FROM members WHERE 1=1`;

      if (name) {
        params.push(`%${name}%`);
        query += ` AND LOWER(name) LIKE LOWER($${params.length})`;
      }

      if (email) {
        params.push(`%${email}%`);
        query += ` AND LOWER(email) LIKE LOWER($${params.length})`;
      }

      query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);

      const { rows } = await pool.query(query, params);
      const countResult = await pool.query("SELECT COUNT(*) FROM members");
      const total = parseInt(countResult.rows[0].count);

      res.json({
        data: rows,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}


module.exports = MemberController;