const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllBooks = async (req, res) => {
  try {
    const { title, author, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const params = [];
    
    let query = `SELECT *, CASE WHEN stock > 0 THEN true ELSE false END as available FROM books WHERE 1=1`;

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
    const countResult = await pool.query("SELECT COUNT(*) FROM books");
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
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBooks = async (req, res) => {
  const books = req.body;

  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ error: "Invalid input data. Expecting an array of books." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN"); 

    const query = `
      INSERT INTO books (id, title, author, published_year, stock, isbn) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    for (const book of books) {
      await client.query(query, [
        uuidv4(), 
        book.title,
        book.author,
        book.published_year,
        book.stock,
        book.isbn,
      ]);
    }

    await client.query("COMMIT"); 
    res.status(201).json({ message: "Books added successfully!" });
  } catch (error) {
    await client.query("ROLLBACK"); 
    console.error("Error inserting books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release(); 
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM books WHERE id = $1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  deleteBook,
};
