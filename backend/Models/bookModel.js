// models/Book.js
import mongoose from 'mongoose';



const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  fileUrl: {
    type: String, // Link to uploaded book (e.g. PDF or image)
    required: true
  },
  coverImageUrl: {
    type: String // Optional image for book cover
  },
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  trendingScore: {
    type: Number,
    default: 0 // used to rank in trending/top picks
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  sells: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase'
  }],
  bookLength: {
    type: Number,
    required: true
  },
  price: {
    type:Number,
    required: true
  },
  
});

export const bookModel = mongoose.model('Book', bookSchema);
