import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Heart, ExternalLink } from 'lucide-react';
import { formatPrice } from '../data/electronicsCategories';

const ProductCard = ({ product, index = 0 }) => {
  const handleContact = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }
    
    // Open contact dialog or redirect to product detail
    window.open(`tel:${product.contact}`, '_self');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card overflow-hidden card-glow group border border-white/5 hover:border-pink-500/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold">
            -{product.discount}%
          </div>
        )}
        
        {/* Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-pink-500 hover:bg-black/60 transition-all">
          <Heart className="w-4 h-4" />
        </button>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={handleContact}
            disabled={!product.inStock}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Seller</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 group-hover:text-pink-400 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/80 text-sm">{product.rating}</span>
          </div>
          <span className="text-white/40 text-sm">({product.reviews} reviews)</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold gradient-text-pink">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-white/40 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Shop Info */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white/80 text-sm font-medium">{product.shopName}</p>
              <p className="text-white/50 text-xs">{product.shopAddress}</p>
            </div>
          </div>
          
          {/* Contact Button */}
          <button
            onClick={handleContact}
            disabled={!product.inStock}
            className="w-full mt-3 px-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-white font-medium text-sm hover:from-pink-500/30 hover:to-purple-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Seller</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
