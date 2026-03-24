import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Store
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { demoProducts, electronicsCategories } from '../data/electronicsCategories';

const Home = () => {
  const featuredProducts = demoProducts.slice(0, 4);
  const stats = [
    { icon: Users, value: '10K+', label: 'Active Users' },
    { icon: Store, value: '500+', label: 'Verified Sellers' },
    { icon: Star, value: '50K+', label: 'Products Listed' },
    { icon: TrendingUp, value: '95%', label: 'Satisfaction Rate' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Compare Prices',
      description: 'Find the best deals from multiple local sellers in one place.'
    },
    {
      icon: MapPin,
      title: 'Local Sellers',
      description: 'Connect with trusted electronics shops in your city.'
    },
    {
      icon: Shield,
      title: 'Verified Sellers',
      description: 'All sellers are verified to ensure safe transactions.'
    },
    {
      icon: Zap,
      title: 'Instant Contact',
      description: 'Directly contact sellers and negotiate the best price.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-bg">
          {/* Animated Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/30 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse-glow animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-float" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-sm">Now serving 9 cities in Jharkhand</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              <span className="text-white">Compare Local</span>
              <br />
              <span className="gradient-text">Electronics Prices</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
            >
              Find the best deals on mobiles, laptops, and electronics from verified local sellers. 
              Save time and money by comparing prices across multiple shops.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                to="/products"
                className="group px-8 py-4 rounded-xl btn-gradient text-lg font-semibold flex items-center space-x-2 shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] hover:-translate-y-1"
              >
                <Search className="w-5 h-5" />
                <span>Browse Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors flex items-center space-x-2"
              >
                <Store className="w-5 h-5" />
                <span>Become a Seller</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass border border-white/5 rounded-2xl p-6 text-center hover-lift hover:bg-white-[0.05] transition-all cursor-default">
                    <Icon className="w-8 h-8 text-pink-500 mx-auto mb-3 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Explore our wide range of electronics categories and find exactly what you're looking for.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {electronicsCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={`/products?category=${category.id}`}
                  className="block glass-card p-6 text-center hover-lift group"
                >
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <h3 className="text-white font-medium group-hover:text-pink-400 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p className="text-white/60">
                Best deals from verified local sellers
              </p>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">PriceCompare</span>?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We make it easy to find the best electronics deals from local sellers you can trust.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 text-center hover-lift"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-pink-500" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20" />
            <div className="absolute inset-0 backdrop-blur-xl" />
            
            {/* Content */}
            <div className="relative p-8 sm:p-12 lg:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Start Selling?
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Join hundreds of verified sellers and reach thousands of potential customers in your city. 
                List your products for free and start growing your business today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center space-x-2"
                >
                  <Store className="w-5 h-5" />
                  <span>Register as Seller</span>
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Store className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">PriceCompare</span>
              </div>
              <p className="text-white/50 text-sm">
                Your trusted platform for comparing electronics prices from local sellers.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/50 hover:text-white text-sm transition-colors">Home</Link></li>
                <li><Link to="/products" className="text-white/50 hover:text-white text-sm transition-colors">Products</Link></li>
                <li><Link to="/register" className="text-white/50 hover:text-white text-sm transition-colors">Become a Seller</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><Link to="/products?category=mobiles" className="text-white/50 hover:text-white text-sm transition-colors">Mobiles</Link></li>
                <li><Link to="/products?category=laptops" className="text-white/50 hover:text-white text-sm transition-colors">Laptops</Link></li>
                <li><Link to="/products?category=audio" className="text-white/50 hover:text-white text-sm transition-colors">Audio</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-white/50 text-sm">support@pricecompare.com</li>
                <li className="text-white/50 text-sm">+91 98765 43210</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              &copy; 2026 PriceCompare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
