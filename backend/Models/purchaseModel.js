// models/Book.js

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  purchaseType: {
    type: String,
    required: true,
    
  },
  Time: {
    type: Date,
     default: Date.now
  },
  expiresAt: {
   type: Date,
     default: Date.now*7
  },
  boughtBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required:true
  },
  
});

module.exports = mongoose.model('Purchase', purchaseSchema);
