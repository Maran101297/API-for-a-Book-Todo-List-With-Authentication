// todoController.js
const BooksModel = require('../models/Books');
const User = require('../models/user');

module.exports = {
 
    addBook: async (req, res) => {
        try {
            const { title, author, year } = req.body;
            const newBook = new BooksModel({
                title,
                author,
                year,
                status: 'Pending', // Set default status
                user: req.user.id, // Associate the Bookdetails with the user
            });
    
            await newBook.save();
            res.status(201).json(newBook); // Send back the created book
        } catch (error) {
            console.error('Error creating book:', error);
            res.status(500).json({ message: 'Failed to create book' });
        }
    },
    
    GetAllBooks: async (req, res) => {
        try {
            const userId = req.user.id; // Assuming you're using authentication middleware to get the user
            const books = await BooksModel.find({ user: userId });
            res.json(books); // Send the books as a JSON response
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).json({ message: 'Failed to retrieve books' });
        }
    },
    getBookById: async (req, res) => {
        const bookId = req.params.id;
        try {
            const book = await BooksModel.findById(bookId); 
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving book', error });
        }
    },
    updateBookDetails: async (req, res) => {
        try {
            const bookId = req.params.id;
            const updatedBook = req.body;
            console.log(updatedBook)
            const book = await BooksModel.findByIdAndUpdate(bookId, updatedBook, { new: true });

            if (!book) {
                return res.status(404).json({ message: 'book not found' });
            }

            res.status(200).json(book);
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).json({ message: 'Failed to update book' });
        }
    },
    deleteBooks: async (req, res) => {
        try {
            const bookId = req.params.id;
            await BooksModel.findByIdAndDelete(bookId);
            res.status(200).json({ message: 'book deleted successfully' });
        } catch (error) {
            console.error('Error deleting book:', error);
            res.status(500).json({ message: 'Failed to delete book' });
        }
    }
};
