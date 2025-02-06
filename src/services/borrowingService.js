const pool = require('../config/database');
const Book = require('../models/book');
const Member = require('../models/member');
const Borrowing = require('../models/borrowing');

class BorrowingService {
  static async createBorrowing({ book_id, member_id }) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const book = await Book.findById(book_id);
      if (!book || book.stock <= 0) {
        throw new Error('Book not available');
      }

      const borrowingCount = await Member.countActiveBorrowings(member_id, client);
      if (borrowingCount >= 3) {
        throw new Error('Member has reached maximum borrowing limit');
      }

      const borrowing = await Borrowing.create({ book_id, member_id }, client);
      await Book.updateStock(book_id, -1, client);

      await client.query('COMMIT');
      return borrowing;

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async returnBook(borrowingId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const borrowing = await Borrowing.findById(borrowingId);
      if (!borrowing) {
        throw new Error('Borrowing record not found');
      }

      if (borrowing.status === 'RETURNED') {
        throw new Error('Book already returned');
      }

      await client.query(
        `UPDATE borrowings 
         SET status = 'RETURNED', return_date = CURRENT_DATE, updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [borrowingId]
      );
      await Book.updateStock(borrowing.book_id, 1, client);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getMemberBorrowings(memberId, filters) {
    return await Borrowing.getMemberBorrowings({ memberId, ...filters });
  }
}

module.exports = BorrowingService;