import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal,
  X,
  ChevronDown
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { demoProducts, electronicsCategories, cities } from '../data/electronicsCategories';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedCity, setSelectedCity] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(demoProducts);

  // Apply filters
  useEffect(() => {
    let filtered = [...demoProducts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.shopName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // City filter
    if (selectedCity !== 'all') {
      filtered = filtered.filter(product => product.city === selectedCity);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedCity, priceRange]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCity('all');
    setPriceRange([0, 500000]);
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedCity !== 'all' || priceRange[1] < 500000;

  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Browse <span className="gradient-text">Products</span>
          </h1>
          <p className="text-white/50">
            Find the best deals on electronics from local sellers
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, shops, categories..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </form>

            {/* Filter Toggle - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-3 rounded-xl glass flex items-center justify-center space-x-2 text-white/80"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-pink-500" />
              )}
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 cursor-pointer min-w-[150px]"
                >
                  <option value="" className="bg-[#0b0e1a]">All Categories</option>
                  {electronicsCategories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-[#0b0e1a]">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>

              {/* City Dropdown */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 cursor-pointer min-w-[150px]"
                >
                  {cities.map(city => (
                    <option key={city.id} value={city.id} className="bg-[#0b0e1a]">
                      {city.name}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mb-6 p-4 glass-card"
          >
            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  <option value="" className="bg-[#0b0e1a]">All Categories</option>
                  {electronicsCategories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-[#0b0e1a]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-white/70 text-sm mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  {cities.map(city => (
                    <option key={city.id} value={city.id} className="bg-[#0b0e1a]">
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Max Price: ₹{priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-white/60">
            Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
          </p>
          
          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {selectedCategory && (
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm flex items-center space-x-2">
                  <span>{electronicsCategories.find(c => c.id === selectedCategory)?.name}</span>
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCity !== 'all' && (
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm flex items-center space-x-2">
                  <span>{cities.find(c => c.id === selectedCity)?.name}</span>
                  <button onClick={() => setSelectedCity('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-white/50 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl btn-gradient"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
