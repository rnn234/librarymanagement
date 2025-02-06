const BorrowingService = require('../services/borrowingService');

class BorrowingController {
  static async createBorrowing(req, res, next) {
    try {
      const borrowing = await BorrowingService.createBorrowing(req.body);
      res.status(201).json(borrowing);
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    try {
      await BorrowingService.returnBook(req.params.id);
      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getMemberBorrowings(req, res, next) {
    try {
      const { status, page, limit } = req.query;
      const borrowings = await BorrowingService.getMemberBorrowings(
        req.params.id,
        { status, page, limit }
      );
      res.json(borrowings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BorrowingController;