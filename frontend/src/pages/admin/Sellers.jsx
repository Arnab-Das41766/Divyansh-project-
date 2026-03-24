import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Store, 
  Star,
  Check,
  X,
  Eye,
  Phone
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSellers();
  }, [searchQuery]);

  const fetchSellers = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getAllSellers({
        search: searchQuery,
        limit: 20
      });
      
      if (response.success) {
        setSellers(response.sellers);
      }
    } catch (error) {
      console.error('Failed to fetch sellers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo sellers if API returns empty
  const demoSellers = [
    {
      _id: '1',
      name: 'Rajesh Kumar',
      shopName: 'TechWorld Electronics',
      email: 'techworld@example.com',
      phone: '+91 98765 43210',
      city: 'Jamshedpur',
      address: 'Main Road, Bistupur',
      isVerified: true,
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      name: 'Priya Sharma',
      shopName: 'Mobile Planet',
      email: 'mobileplanet@example.com',
      phone: '+91 98765 43211',
      city: 'Jamshedpur',
      address: 'Sakchi Market',
      isVerified: true,
      createdAt: '2024-02-20'
    },
    {
      _id: '3',
      name: 'Amit Patel',
      shopName: 'Digital Hub',
      email: 'digitalhub@example.com',
      phone: '+91 98765 43212',
      city: 'Ranchi',
      address: 'H.B. Road',
      isVerified: false,
      createdAt: '2024-03-10'
    },
  ];

  const displaySellers = sellers.length > 0 ? sellers : demoSellers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Sellers</h1>
        <p className="text-white/50 mt-1">Manage seller accounts and verifications.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Total Sellers</p>
          <p className="text-2xl font-bold text-white">{displaySellers.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Verified</p>
          <p className="text-2xl font-bold text-green-400">
            {displaySellers.filter(s => s.isVerified).length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {displaySellers.filter(s => !s.isVerified).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search sellers by name, shop, or city..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
        />
      </div>

      {/* Sellers Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displaySellers.map((seller, index) => (
            <motion.div
              key={seller._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                    <Store className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{seller.shopName}</h3>
                    <p className="text-white/50 text-sm">{seller.name}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  seller.isVerified 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {seller.isVerified ? 'Verified' : 'Pending'}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{seller.address}, {seller.city}</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{seller.phone}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-white/60 text-sm ml-2">(4.8)</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 rounded-lg glass text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm flex items-center justify-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                {!seller.isVerified && (
                  <button className="flex-1 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-sm flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Verify</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sellers;
