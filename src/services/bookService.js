const Book = require('../models/book');

class BookService {
  static async getBooks(filters) {
    return await Book.findAll(filters);
  }
}

module.exports = BookService;