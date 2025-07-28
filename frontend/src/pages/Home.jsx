import React, { useState } from 'react';
import { 
  BookOpen, 
  Star, 
  TrendingUp, 
  Clock, 
  Award, 
  ArrowRight,
  Play,
  Users,
  Download,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Crown
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data - replace with real data from your API
  const featuredBooks = [
    {
      id: 1,
      title: "The Digital Renaissance",
      author: "Sarah Chen",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      rating: 4.8,
      genre: "Technology",
      description: "A journey through the digital transformation of our world."
    },
    {
      id: 2,
      title: "Midnight Chronicles",
      author: "Alex Rivera",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rating: 4.9,
      genre: "Fantasy",
      description: "An epic tale of magic and adventure in a mystical realm."
    },
    {
      id: 3,
      title: "The Mindful Leader",
      author: "Dr. Michael Stone",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      rating: 4.7,
      genre: "Self-Help",
      description: "Transform your leadership through mindfulness practices."
    }
  ];

  const trendingBooks = [
    { id: 1, title: "Quantum Physics Made Simple", author: "Dr. Lisa Park", views: "12.3K", trend: "+15%" },
    { id: 2, title: "The Art of Storytelling", author: "James Wilson", views: "8.7K", trend: "+22%" },
    { id: 3, title: "Sustainable Living Guide", author: "Emma Green", views: "6.9K", trend: "+18%" },
    { id: 4, title: "Digital Marketing Mastery", author: "Ryan Cole", views: "11.2K", trend: "+12%" }
  ];

  const userReadingList = [
    { id: 1, title: "Introduction to AI", author: "Tech Guru", progress: 75, cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop" },
    { id: 2, title: "Creative Writing Workshop", author: "Jane Doe", progress: 45, cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=150&h=200&fit=crop" },
    { id: 3, title: "Modern Philosophy", author: "Dr. Smith", progress: 20, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=200&fit=crop" }
  ];

  const topPicks = [
    { id: 1, title: "The Future of Work", author: "Business Expert", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=250&fit=crop" },
    { id: 2, title: "Space Exploration", author: "Dr. Cosmos", cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=250&fit=crop" },
    { id: 3, title: "Culinary Adventures", author: "Chef Mario", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=250&fit=crop" },
    { id: 4, title: "Mental Health Guide", author: "Dr. Wellness", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop" }
  ];

  const newArrivals = [
    { id: 1, title: "Climate Change Solutions", author: "Environmental Scientist", isNew: true },
    { id: 2, title: "Blockchain Revolution", author: "Crypto Expert", isNew: true },
    { id: 3, title: "Yoga for Beginners", author: "Wellness Coach", isNew: true },
    { id: 4, title: "Photography Mastery", author: "Pro Photographer", isNew: true }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 opacity-20 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Your Digital
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                  Library Universe
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover, publish, and share books in our vibrant community of readers and writers. 
                Your next great read is just a click away.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Start Reading</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              <StatItem icon={BookOpen} value="10K+" label="Books" />
              <StatItem icon={Users} value="5K+" label="Authors" />
              <StatItem icon={Download} value="100K+" label="Downloads" />
              <StatItem icon={Heart} value="50K+" label="Favorites" />
            </div>
          </div>
        </div>

        {/* Floating Books Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '1s' }}>
            <BookOpen className="h-8 w-8 text-purple-400 opacity-30" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '2s' }}>
            <BookOpen className="h-6 w-6 text-pink-400 opacity-30" />
          </div>
          <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '3s' }}>
            <BookOpen className="h-10 w-10 text-blue-400 opacity-30" />
          </div>
        </div>
      </section>

      {/* Featured Books Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Books
            </h2>
            <p className="text-gray-600 text-lg">Hand-picked selections from our editorial team</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {featuredBooks.map((book) => (
                  <div key={book.id} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 md:p-12">
                      <div className="md:w-1/2 space-y-6">
                        <div className="space-y-4">
                          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                            {book.genre}
                          </span>
                          <h3 className="text-3xl md:text-4xl font-bold">{book.title}</h3>
                          <p className="text-xl text-purple-100">by {book.author}</p>
                          <p className="text-gray-200 text-lg">{book.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{book.rating}</span>
                          </div>
                          <button className="px-6 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                            Read Now
                          </button>
                        </div>
                      </div>
                      <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-64 h-80 object-cover rounded-lg shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* User Reading List */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            icon={BookOpen}
            title="Your Current Reading List"
            subtitle="Continue where you left off"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userReadingList.map((book) => (
              <ReadingCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Currently Trending */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            icon={TrendingUp}
            title="Currently Trending"
            subtitle="What everyone's reading right now"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingBooks.map((book, index) => (
              <TrendingCard key={book.id} book={book} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks For You */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            icon={Crown}
            title="Top Picks For You"
            subtitle="Curated based on your reading history"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPicks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            icon={Sparkles}
            title="New Arrivals"
            subtitle="Fresh content from our community"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((book) => (
              <NewArrivalCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <Zap className="h-12 w-12 mx-auto text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl text-purple-100">
              Join thousands of authors who have published their books on our platform
            </p>
            <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Publish Your Book
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Components
const StatItem = ({ icon: Icon, value, label }) => (
  <div className="text-center group">
    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-3 group-hover:bg-white/20 transition-all duration-300">
      <Icon className="h-10 w-10 text-purple-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-gray-300">{label}</div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center mb-12">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-600 text-lg">{subtitle}</p>
  </div>
);

const ReadingCard = ({ book }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group">
    <div className="flex items-center space-x-4">
      <img src={book.cover} alt={book.title} className="w-16 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{book.title}</h3>
        <p className="text-gray-600 text-sm">{book.author}</p>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{book.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${book.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TrendingCard = ({ book, rank }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
          {rank}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{book.title}</h3>
        <p className="text-gray-600 text-sm">{book.author}</p>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1 text-gray-500">
            <Eye className="h-4 w-4" />
            <span className="text-sm">{book.views}</span>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-semibold">{book.trend}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BookCard = ({ book }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    <div className="aspect-w-3 aspect-h-4 bg-gray-200">
      <img src={book.cover} alt={book.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{book.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{book.author}</p>
    </div>
  </div>
);

const NewArrivalCard = ({ book }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group relative">
    <div className="absolute top-4 right-4">
      <span className="inline-block px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-semibold rounded-full">
        NEW
      </span>
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{book.title}</h3>
      <p className="text-gray-600 text-sm">{book.author}</p>
      <div className="flex items-center space-x-2 text-gray-500">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Just published</span>
      </div>
    </div>
  </div>
);

export default Home;