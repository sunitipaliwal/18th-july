// models/User.js
import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  readingList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  publishedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],
  booksBought: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase'
  }],
  
},
{timestamps: true});

let userModel;
export  default  userModel = mongoose.model('User', userSchema);
