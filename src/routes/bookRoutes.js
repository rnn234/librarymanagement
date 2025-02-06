const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.post("/", bookController.addBooks); 
router.get("/:id", bookController.getBookById); 
router.delete("/:id", bookController.deleteBook); 

module.exports = router;
