import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  ShoppingBag,
  Heart,
  Settings
} from 'lucide-react';
import { electronicsCategories, cities } from '../data/electronicsCategories';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location_, setLocation] = useState(localStorage.getItem('location') || 'jamshedpur');
  const [isLocating, setIsLocating] = useState(false);
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const profileRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-detect location
  const detectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding here
          // For demo, we'll just set a default
          setTimeout(() => {
            setLocation('jamshedpur');
            localStorage.setItem('location', 'jamshedpur');
            setIsLocating(false);
          }, 1500);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
      setIsSearchOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed z-50 transition-all duration-300 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-7xl rounded-2xl ${
          isScrolled 
            ? 'top-4 glass-nav' 
            : 'top-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                PriceCompare
              </span>
            </Link>

            {/* Location Selector */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={detectLocation}
                disabled={isLocating}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-white/80">
                  {isLocating ? 'Detecting...' : cities.find(c => c.id === location_)?.name || 'Jamshedpur'}
                </span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="flex items-center">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="absolute left-1 top-1 bottom-1 w-32 bg-white/10 border border-white/10 rounded-lg text-sm text-white/80 focus:outline-none focus:border-purple-500/50 px-2"
                  >
                    <option value="" className="bg-[#0b0e1a]">All Categories</option>
                    {electronicsCategories.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#0b0e1a]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-36 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Button - Mobile */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5 text-white/80" />
              </button>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/') 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/products') 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Products
                </Link>
              </div>

              {/* Auth Buttons or Profile */}
              {token ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl glass-strong overflow-hidden shadow-2xl"
                      >
                        <div className="p-4 border-b border-white/10">
                          <p className="text-white font-medium">My Account</p>
                          <p className="text-white/50 text-sm capitalize">{role}</p>
                        </div>
                        <div className="p-2">
                          {role === 'seller' && (
                            <Link
                              to="/seller/dashboard"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span className="text-sm">Seller Dashboard</span>
                            </Link>
                          )}
                          {role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                              <Settings className="w-4 h-4" />
                              <span className="text-sm">Admin Panel</span>
                            </Link>
                          )}
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className="text-sm">Profile</span>
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Wishlist</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="hidden sm:block px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium btn-gradient"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white/80" />
                ) : (
                  <Menu className="w-5 h-5 text-white/80" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 mx-2 rounded-xl border border-white/10 bg-[#0b0e1a]/90 backdrop-blur-3xl overflow-hidden shadow-2xl"
            >
              <div className="px-4 py-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive('/') 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive('/products') 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Products
                </Link>
                {!token && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium btn-gradient text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0b0e1a]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Search Products</h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>
              <form onSubmit={handleSearch}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full mb-3 p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  <option value="" className="bg-[#0b0e1a]">All Categories</option>
                  {electronicsCategories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#0b0e1a]">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full p-4 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
