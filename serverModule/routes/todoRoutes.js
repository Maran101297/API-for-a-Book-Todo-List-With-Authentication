// BookRouter.js
const express = require('express');
const todoController = require('../controllers/todoController');
const bookRouter = express.Router();
const { protect } = require('../middlewares/authMiddleware');

bookRouter.post('/books', protect, todoController.addBook);

bookRouter.get('/books', protect, todoController.GetAllBooks);

bookRouter.get("/book/:id", protect, todoController.getBookById);

bookRouter.put('/books/:id', protect, todoController.updateBookDetails);

bookRouter.delete('/books/:id', protect, todoController.deleteBooks);

module.exports = bookRouter;
