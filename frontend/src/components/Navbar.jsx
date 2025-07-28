import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Heart, 
  User, 
  Home, 
  Menu, 
  X,
  Grid3X3,
  Library
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              <div className="absolute -inset-2 bg-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
              LibraryStore
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <NavLink href="/" icon={Home} text="Home" />
              <NavLink href="/browse" icon={Grid3X3} text="Browse" />
              <NavLink href="/add-book" icon={Plus} text="Add Book" />
              <NavLink href="/my-library" icon={Library} text="My Library" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search books, authors, tags..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20 cursor-text"
              />
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 cursor-pointer group">
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-full text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 cursor-pointer group"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">Profile</span>
                </button>
                
                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-xl border border-purple-500/20 animate-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors duration-200 cursor-pointer">
                        Dashboard
                      </a>
                      <a href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 transition-colors duration-200 cursor-pointer">
                        Edit Profile
                      </a>
                      <div className="border-t border-purple-500/20 my-1"></div>
                      <a href="/logout" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors duration-200 cursor-pointer">
                        Sign Out
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20 animate-in slide-in-from-top-2 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-purple-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-text"
                />
              </div>
            </div>
            
            <MobileNavLink href="/" icon={Home} text="Home" />
            <MobileNavLink href="/browse" icon={Grid3X3} text="Browse Categories" />
            <MobileNavLink href="/add-book" icon={Plus} text="Add Book" />
            <MobileNavLink href="/my-library" icon={Library} text="My Library" />
            <MobileNavLink href="/favorites" icon={Heart} text="Favorites" />
            <MobileNavLink href="/dashboard" icon={User} text="Dashboard" />
            
            <div className="border-t border-purple-500/20 my-2"></div>
            <MobileNavLink href="/logout" icon={User} text="Sign Out" />
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, icon: Icon, text }) => (
  <a
    href={href}
    className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
  >
    <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
    <span className="relative z-10">{text}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </a>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ href, icon: Icon, text }) => (
  <a
    href={href}
    className="group flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 cursor-pointer"
  >
    <Icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
    {text}
  </a>
);

export default Navbar;