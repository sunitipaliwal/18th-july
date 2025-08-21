import express from 'express';
// Add this import at the top of your bookRouter file
import { bookModel } from '../Models/bookModel.js'; // Adjust path as needed

import {
  addBook,
  getBookDetails,
  getAllBooks,
  getMyBooks,
  purchaseBook
} from '../Controllers/bookController.js';

import { protect } from '../Middleware/protect.js';
import { uploadBookFiles } from '../Middleware/uploadMiddleware.js';

const bookRouter = express.Router();

// Your existing routes
bookRouter.post('/add-book', protect , uploadBookFiles, addBook);
bookRouter.get('/details/:id', getBookDetails);
bookRouter.get('/all', getAllBooks);
bookRouter.get('/my-books/:userId', getMyBooks);
bookRouter.post('/purchase', purchaseBook);

// NEW ROUTES - Add these to your existing router
// Get all books with filtering and pagination for browse page
// In your existing GET '/books' route, enhance the search functionality:
bookRouter.get('/books', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      sortBy = 'popular'
    } = req.query;

    let query = { isActive: true };

    // Filter by category/genre - ENHANCED
    if (category && category !== 'all') {
      query.genre = { $regex: new RegExp(category, 'i') };
    }

    // Search functionality - ENHANCED
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: { $regex: searchRegex } },
        { authorName: { $regex: searchRegex } },
        { description: { $regex: searchRegex } }
      ];
    }

    // Sorting - ENHANCED to handle edge cases
    let sortOptions = {};
    switch (sortBy) {
      case 'popular':
        sortOptions = { reviews: -1, trendingScore: -1, createdAt: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1, createdAt: -1 };
        break;
      case 'price-low':
        sortOptions = { price: 1, createdAt: -1 };
        break;
      case 'price-high':
        sortOptions = { price: -1, createdAt: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const books = await bookModel
      .find(query)
      .populate('publishedBy', 'name')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await bookModel.countDocuments(query);

    // ENHANCED response with better metadata
    res.json({
      success: true,
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalBooks: total,
      hasMore: parseInt(page) < Math.ceil(total / limit),
      // ADD: Search metadata for frontend
      searchQuery: search || null,
      category: category || 'all'
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching books', 
      error: error.message 
    });
  }
});


// Get books by specific genre
bookRouter.get('/books/genre/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await bookModel
      .find({ 
        genre: { $regex: new RegExp(genre, 'i') },
        isActive: true 
      })
      .populate('publishedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books by genre', error: error.message });
  }
});

export default bookRouter;
