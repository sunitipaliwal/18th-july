import React from 'react';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Github,
  Heart,
  ArrowUp,
  Send
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                <div className="absolute -inset-2 bg-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                LibraryStore
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your digital library destination. Discover, publish, and share books in our vibrant community of readers and writers.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Instagram} />
              <SocialLink href="#" icon={Github} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </h3>
            <div className="space-y-2">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/browse" text="Browse Categories" />
              <FooterLink href="/add-book" text="Add Book" />
              <FooterLink href="/my-library" text="My Library" />
              <FooterLink href="/dashboard" text="Dashboard" />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 relative">
              Popular Categories
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </h3>
            <div className="space-y-2">
              <FooterLink href="/category/fiction" text="Fiction" />
              <FooterLink href="/category/non-fiction" text="Non-Fiction" />
              <FooterLink href="/category/self-help" text="Self-Help" />
              <FooterLink href="/category/history" text="History" />
              <FooterLink href="/category/science" text="Science" />
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 relative">
              Stay Connected
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </h3>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                Subscribe for book recommendations and updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 cursor-text"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-r-lg transition-all duration-300 cursor-pointer group">
                  <Send className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <ContactItem icon={Mail} text="hello@librarystore.com" />
              <ContactItem icon={Phone} text="+1 (555) 123-4567" />
              <ContactItem icon={MapPin} text="123 Library St, Book City" />
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">Support</h4>
              <div className="space-y-1">
                <FooterLink href="/help" text="Help Center" />
                <FooterLink href="/contact" text="Contact Us" />
                <FooterLink href="/faq" text="FAQ" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">Legal</h4>
              <div className="space-y-1">
                <FooterLink href="/privacy" text="Privacy Policy" />
                <FooterLink href="/terms" text="Terms of Service" />
                <FooterLink href="/cookies" text="Cookie Policy" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-2">Company</h4>
              <div className="space-y-1">
                <FooterLink href="/about" text="About Us" />
                <FooterLink href="/careers" text="Careers" />
                <FooterLink href="/press" text="Press" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2025 LibraryStore. Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for book lovers</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Back to top</span>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 hover:text-purple-300 transition-all duration-300 cursor-pointer group"
              >
                <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Link Component
const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="p-2 rounded-full bg-white/10 hover:bg-purple-500/20 text-gray-400 hover:text-purple-300 transition-all duration-300 cursor-pointer group"
  >
    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
  </a>
);

// Footer Link Component
const FooterLink = ({ href, text }) => (
  <a
    href={href}
    className="block text-gray-300 hover:text-purple-300 transition-colors duration-300 cursor-pointer text-sm hover:translate-x-1 transform transition-transform duration-300"
  >
    {text}
  </a>
);

// Contact Item Component
const ContactItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-3 text-gray-300 text-sm">
    <Icon className="h-4 w-4 text-purple-400 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

export default Footer;