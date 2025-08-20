// BrowsePage.jsx (a.k.a. Search.jsx)
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  BookOpen, Search, Filter, Grid3X3, List, Star, Eye, Heart,
  Clock, TrendingUp, Award, Zap, Globe, Users, Brain, Palette,
  Music, Gamepad2, Coffee, Briefcase, Lightbulb
} from 'lucide-react';

const BrowsePage = () => {
  /* ---------------------- original component state ---------------------- */
  const [searchQuery,       setSearchQuery]       = useState('');
  const [selectedCategory,  setSelectedCategory]  = useState('all');
  const [viewMode,          setViewMode]          = useState('grid');
  const [sortBy,            setSortBy]            = useState('popular');

  /* ------------ NEW: holds everything that comes from MongoDB ----------- */
  const [dbBooks, setDbBooks] = useState([]);
  const [myFavIds, setMyFavIds] = useState(new Set());
  const resultsRef = useRef(null);

  /* ------------------------- category buttons --------------------------- */
  const categories = [
    { id: 'all',       name: 'All Categories',     icon: Globe,    count: 2847, color: 'from-purple-500 to-pink-500' },
    { id: 'fiction',   name: 'Fiction',            icon: BookOpen, count: 456,  color: 'from-blue-500 to-cyan-500' },
    { id: 'mystery',   name: 'Mystery & Thriller', icon: Eye,      count: 234,  color: 'from-red-500 to-orange-500' },
    { id: 'romance',   name: 'Romance',            icon: Heart,    count: 387,  color: 'from-pink-500 to-rose-500' },
    { id: 'scifi',     name: 'Sci-Fi & Fantasy',   icon: Zap,      count: 298,  color: 'from-indigo-500 to-purple-500' },
    { id: 'history',   name: 'History',            icon: Clock,    count: 156,  color: 'from-amber-500 to-yellow-500' },
    { id: 'biography', name: 'Biography',          icon: Users,    count: 189,  color: 'from-green-500 to-emerald-500' },
    { id: 'selfhelp',  name: 'Self-Help',          icon: Lightbulb,count: 267,  color: 'from-teal-500 to-cyan-500' },
    { id: 'business',  name: 'Business',           icon: Briefcase,count: 198,  color: 'from-slate-500 to-gray-500' },
    { id: 'psychology',name: 'Psychology',         icon: Brain,    count: 145,  color: 'from-violet-500 to-purple-500' },
    { id: 'art',       name: 'Art & Design',       icon: Palette,  count: 112,  color: 'from-orange-500 to-red-500' },
    { id: 'music',     name: 'Music',              icon: Music,    count: 89,   color: 'from-cyan-500 to-blue-500' },
    { id: 'gaming',    name: 'Gaming',             icon: Gamepad2, count: 76,   color: 'from-lime-500 to-green-500' },
    { id: 'cooking',   name: 'Cooking',            icon: Coffee,   count: 134,  color: 'from-yellow-500 to-orange-500' }
  ];

  /* ---------------------------- mock book data -------------------------- */
  const books = [
    // — Fiction —
    { id: 1,  title: 'The Midnight Library',      author: 'Matt Haig',      category: 'fiction',  rating: 4.8, reviews: 1247, price: 12.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', trending: true,  newRelease: false },
    { id: 7,  title: 'The Thursday Murder Club',  author: 'Richard Osman',  category: 'fiction',  rating: 4.6, reviews: 892,  price: 11.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 8,  title: 'Where the Crawdads Sing',   author: 'Delia Owens',    category: 'fiction',  rating: 4.7, reviews: 2134, price: 13.49, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop', trending: true,  newRelease: false },

    // — Self-Help —
    { id: 2,  title: 'Atomic Habits',             author: 'James Clear',    category: 'selfhelp', rating: 4.9, reviews: 2156, price: 15.99, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop', trending: true,  newRelease: false },
    { id: 9,  title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', category: 'selfhelp', rating: 4.5, reviews: 1876, price: 14.99, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 10, title: 'Think and Grow Rich',       author: 'Napoleon Hill',  category: 'selfhelp', rating: 4.4, reviews: 1234, price: 12.49, image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop', trending: false, newRelease: false },

    // — Mystery & Thriller —
    { id: 3,  title: 'The Silent Patient',        author: 'Alex Michaelides',category: 'mystery', rating: 4.7, reviews: 987,  price: 13.99, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop', trending: false, newRelease: true },
    { id: 11, title: 'Gone Girl',                 author: 'Gillian Flynn',  category: 'mystery', rating: 4.6, reviews: 3456, price: 12.99, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop', trending: true,  newRelease: false },
    { id: 12, title: 'The Girl with the Dragon Tattoo',author: 'Stieg Larsson',category: 'mystery', rating: 4.5, reviews: 2789, price: 11.49, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', trending: false, newRelease: false },

    // — Sci-Fi & Fantasy —
    { id: 4,  title: 'Dune',                      author: 'Frank Herbert',  category: 'scifi',   rating: 4.6, reviews: 3421, price: 14.99, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop', trending: true,  newRelease: false },
    { id: 13, title: 'The Hobbit',                author: 'J.R.R. Tolkien', category: 'scifi',   rating: 4.8, reviews: 4567, price: 13.99, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 14, title: 'Ender\'s Game',             author: 'Orson Scott Card',category: 'scifi',  rating: 4.7, reviews: 2345, price: 12.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', trending: false, newRelease: false },

    // — Romance —
    { id: 5,  title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', category: 'romance', rating: 4.8, reviews: 1876, price: 13.49, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', trending: true,  newRelease: false },
    { id: 15, title: 'It Ends with Us',           author: 'Colleen Hoover', category: 'romance', rating: 4.6, reviews: 3456, price: 12.99, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop', trending: true,  newRelease: false },
    { id: 16, title: 'The Hating Game',           author: 'Sally Thorne',   category: 'romance', rating: 4.5, reviews: 1987, price: 11.99, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop', trending: false, newRelease: true },

    // — History —
    { id: 6,  title: 'Sapiens',                   author: 'Yuval Noah Harari', category: 'history', rating: 4.5, reviews: 2743, price: 16.99, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 17, title: 'The Guns of August',        author: 'Barbara Tuchman',  category: 'history', rating: 4.4, reviews: 1234, price: 15.49, image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 18, title: '1776',                      author: 'David McCullough', category: 'history', rating: 4.6, reviews: 1876, price: 14.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', trending: false, newRelease: false },

    // — Biography —
    { id: 19, title: 'Steve Jobs',                author: 'Walter Isaacson', category: 'biography', rating: 4.7, reviews: 2987, price: 17.99, image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 20, title: 'Becoming',                  author: 'Michelle Obama',  category: 'biography', rating: 4.8, reviews: 4321, price: 18.99, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', trending: true,  newRelease: false },

    // — Business —
    { id: 21, title: 'Good to Great',             author: 'Jim Collins',    category: 'business', rating: 4.5, reviews: 1654, price: 16.49, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop', trending: false, newRelease: false },
    { id: 22, title: 'The Lean Startup',          author: 'Eric Ries',      category: 'business', rating: 4.4, reviews: 2134, price: 15.99, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop', trending: false, newRelease: false }
  ];

  /* ---------------------------------------------------------------------- */
  /*   1. fetch books from backend once (on mount)                           */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const fetchFromDB = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/book/books', {
          params: { page: 1, limit: 500 },
          withCredentials: true
        });

        const transformed = res.data.books.map(b => ({
          id:         b._id,
          title:      b.title,
          author:     b.authorName,
          category:   (b.genre || '').toLowerCase(),   // must match your category ids
          rating:     b.rating    ?? 0,
          reviews:    b.reviews   ?? 0,
          price:      b.price,
          image:      b.coverImageUrl
                        ? `http://localhost:3000${b.coverImageUrl}`
                        : 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
          trending:   b.trending  ?? false,
          newRelease: b.newRelease?? false
        }));

        setDbBooks(transformed);
      } catch (err) {
        console.error('Could not load books from server:', err);
      }
    };

    fetchFromDB();
  }, []);


  // Add this useEffect after your existing useEffect that fetches books



  /* ---------------------------------------------------------------------- */
  /*   2. merge sample + database books, ensuring no duplicate ids          */
  /* ---------------------------------------------------------------------- */
  const mergedBooks = React.useMemo(() => {
    const ids = new Set();
    return [...books, ...dbBooks].filter(b => {
      if (ids.has(b.id)) return false;
      ids.add(b.id);
      return true;
    });
  }, [books, dbBooks]);



  

useEffect(() => {
  const loadFavs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/favorites", { withCredentials: true });
      if (res.data?.success) {
        const ids = new Set((res.data.favorites || []).map(b => String(b._id)));
        setMyFavIds(ids);
      }
    } catch (e) {
      // not logged in or error — ignore silently
    }
  };
  loadFavs();
}, []);

const isFav = (bookId) => myFavIds.has(String(bookId));

const toggleFavorite = async (bookId) => {
  try {
    if (isFav(bookId)) {
      await axios.delete(`http://localhost:3000/api/user/favorites/${bookId}`, { withCredentials: true });
      setMyFavIds(prev => {
        const next = new Set(prev);
        next.delete(String(bookId));
        return next;
      });
    } else {
      await axios.post(`http://localhost:3000/api/user/favorites/${bookId}`, {}, { withCredentials: true });
      setMyFavIds(prev => {
        const next = new Set(prev);
        next.add(String(bookId));
        return next;
      });
    }
  } catch (e) {
    alert("Please log in to favorite books.");
  }
};


  /* ----------------------------- filtering ------------------------------ */
  const filteredBooks = mergedBooks.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /* ------------------------------ sorting ------------------------------- */
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'popular':    return b.reviews - a.reviews;
      case 'rating':     return b.rating  - a.rating;
      case 'price-low':  return a.price   - b.price;
      case 'price-high': return b.price   - a.price;
      case 'newest':     return b.newRelease - a.newRelease;
      default:           return 0;
    }
  });

  // Enhanced auto-scroll with debounce
useEffect(() => {
  // Only scroll if there's a search query and user has stopped typing
  if (searchQuery.trim() !== '' && resultsRef.current) {
    // Debounce the scroll - wait 800ms after user stops typing
    const timeoutId = setTimeout(() => {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 800); // Wait 800ms after user stops typing

    // Clear timeout if user continues typing
    return () => clearTimeout(timeoutId);
  }
}, [searchQuery, sortedBooks]);


  /* ---------------------------------------------------------------------- */
  /*   3. everything below is your ORIGINAL JSX (unchanged)                 */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* ------------------------------ HERO ------------------------------ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Browse Our Collection
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover thousands of books across every genre. From bestsellers to hidden gems, find your next great read.
            </p>

            {/* -------------------------- SEARCH --------------------------- */}
            <div className="max-w-2xl mx-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search for author or by book name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------- CATEGORY GRID ------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Categories</h2>

          {/* View-mode toggle + sort */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
                  selectedCategory === cat.id ? 'bg-purple-500/30 ring-2 ring-purple-400' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${cat.color} p-3 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-white font-medium text-sm mb-1 group-hover:text-purple-300 transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-gray-400 text-xs">{cat.count} books</p>
              </button>
            );
          })}
        </div>

        {/* ------------------------------ BOOKS ----------------------------- */}
        <div ref={resultsRef}  className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedCategory === 'all'
                ? 'All Books'
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-400"> {searchQuery.trim() !== '' 
        ? `${sortedBooks.length} books found for "${searchQuery}"` 
        : `${sortedBooks.length} books found`
      } books found</p>
          </div>
        </div>

       {/* GRID or LIST */}
<div
  className={`grid gap-6 ${
    viewMode === 'grid'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1'
  }`}
>
  {/* ADD THIS - No Results Message */}
  {sortedBooks.length === 0 && searchQuery.trim() !== '' && (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <div className="text-center">
        <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Book Not Found</h3>
        <p className="text-gray-400 mb-4">
          Sorry, we couldn't find any books matching "<span className="text-purple-400 font-semibold">{searchQuery}</span>"
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Try searching with different keywords or browse our categories above.
        </p>
        <button
          onClick={() => setSearchQuery('')}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
        >
          Clear Search
        </button>
      </div>
    </div>
  )}

  {/* Your existing book mapping - UNCHANGED */}
  {sortedBooks.map((book) => (
    <div
      key={book.id}
      className={`group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer ${
        viewMode === 'list' ? 'flex items-center space-x-6 p-6' : 'p-6'
      }`}
    >
      {/* cover */}
      <div
        className={`relative ${
          viewMode === 'list' ? 'w-24 h-32 flex-shrink-0' : 'w-full h-64 mb-4'
        }`}
      >
        <img
          src={book.image}
          alt={book.title}
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop';
          }}
          className="w-full h-full object-cover rounded-lg"
        />

        {book.trending && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </div>
        )}
        {book.newRelease && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            New
          </div>
        )}
      </div>

      {/* details */}
      <div className={viewMode === 'list' ? 'flex-1' : ''}>
        <h3 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-gray-400 text-sm mb-2">by {book.author}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm ml-1">{book.rating}</span>
          </div>
          <span className="text-gray-400 text-sm">({book.reviews} reviews)</span>
        </div>

        <div
          className={`flex items-center justify-between ${viewMode === 'list' ? 'mt-4' : ''}`}
        >
          <span className="text-2xl font-bold text-purple-400">${book.price}</span>
          <div className="flex space-x-2">
            <button
  onClick={(e) => {
    e.stopPropagation();
    toggleFavorite(book.id);
  }}
  className={`p-2 rounded-full transition-all duration-300 ${
    isFav(book.id)
      ? "bg-pink-500 text-white"
      : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:text-white"
  }`}
  title={isFav(book.id) ? "Remove Favorite" : "Add to Favorites"}
>
  <Heart className="w-4 h-4" />
</button>

            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default BrowsePage;
