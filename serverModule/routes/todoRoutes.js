// BookRouter.js
const express = require('express');
const todoController = require('../controllers/todoController');
const bookRouter = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { bookValidationRules, validate } = require('../middlewares/validation');

// Route to add a new book with validation and authentication
bookRouter.post('/books', protect, bookValidationRules, validate, todoController.addBook);

// Route to get all books for an authenticated user
bookRouter.get('/books', protect, todoController.GetAllBooks);

// Route to get details of a specific book
bookRouter.get('/book/:id', protect, todoController.getBookById);

// Route to update book details with validation and authentication
bookRouter.put('/books/:id', protect, bookValidationRules, validate, todoController.updateBookDetails);

// Route to delete a book
bookRouter.delete('/books/:id', protect, todoController.deleteBooks);

module.exports = bookRouter;

