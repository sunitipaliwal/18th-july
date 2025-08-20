import React, { useState } from 'react';
import axios from 'axios';

import { 
  BookOpen, 
  Mail, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (password.trim() !== confirmPassword.trim()) {
      alert('Passwords must match!');
      return;
    }

    setIsLoading(true);
    
    // Simulate your actual API call
    try {
      
      const res = await axios.post('http://localhost:3000/api/user/signup', {
        email, password, username
      }, { withCredentials: true });
      
      // Simulated success response
      if(res.data.success){
        alert("Signup successfulllllll");
      }
     
    } catch (error) {
console.error("Signup error response:", error.response?.data);
alert(error.response?.data?.message || "Something went wrong. Please try again.");
setIsLoading(false);
}
  };

  return (
    <div  className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navbar Logo for Consistency */}
      

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Sparkles className="h-12 w-12 text-purple-400 animate-pulse" />
                <div className="absolute -inset-3 bg-purple-400/20 rounded-full blur-lg opacity-70"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Join LibraryStore
            </h1>
            <p className="text-gray-400 text-lg">
              Create your account and start building your digital library
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 p-8 relative overflow-hidden">
            {/* Form Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl"></div>
            
            <div className="relative z-10 space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                  User Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/10 hover:border-purple-400/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Signup Button */}
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
                  {!isLoading && (
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-purple-500/20">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <a 
                    href="/signin" 
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 hover:underline"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;