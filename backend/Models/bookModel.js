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
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // New fields to match your browse page requirements
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  trendingScore: {
    type: Number,
    default: 0 // used to rank in trending/top picks
  },
  trending: {
    type: Boolean,
    default: false
  },
  newRelease: {
    type: Boolean,
    default: true // New books are marked as new releases
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
    type: Number,
    required: true
  },
  // Additional fields for better browsing experience
  tags: [{
    type: String
  }],
  language: {
    type: String,
    default: 'English'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Index for better search performance
bookSchema.index({ title: 'text', authorName: 'text', description: 'text' });
bookSchema.index({ genre: 1 });
bookSchema.index({ createdAt: -1 });
bookSchema.index({ rating: -1 });
bookSchema.index({ trending: -1 });

// Middleware to update updatedAt on save
bookSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const bookModel = mongoose.model('Book', bookSchema);
