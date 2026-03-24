import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Check,
  X,
  Flag,
  MoreVertical
} from 'lucide-react';
import { demoProducts, formatPrice } from '../../data/electronicsCategories';

const Ads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Demo ads with status
  const ads = demoProducts.map(product => ({
    ...product,
    status: Math.random() > 0.3 ? 'active' : 'pending',
    views: Math.floor(Math.random() * 1000) + 100,
    reports: Math.floor(Math.random() * 5)
  }));

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ad.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    console.log('Approve ad:', id);
  };

  const handleReject = (id) => {
    console.log('Reject ad:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Ads Management</h1>
        <p className="text-white/50 mt-1">Review and manage all product listings.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Total Ads</p>
          <p className="text-2xl font-bold text-white">{ads.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">
            {ads.filter(a => a.status === 'active').length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">
            {ads.filter(a => a.status === 'pending').length}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Flagged</p>
          <p className="text-2xl font-bold text-red-400">3</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ads by product or seller..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
        >
          <option value="all" className="bg-[#0b0e1a]">All Status</option>
          <option value="active" className="bg-[#0b0e1a]">Active</option>
          <option value="pending" className="bg-[#0b0e1a]">Pending</option>
          <option value="flagged" className="bg-[#0b0e1a]">Flagged</option>
        </select>
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAds.map((ad, index) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={ad.image}
                alt={ad.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  ad.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {ad.status}
                </span>
              </div>
              {ad.reports > 0 && (
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center space-x-1">
                    <Flag className="w-3 h-3" />
                    <span>{ad.reports}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">{ad.name}</h3>
              <p className="text-lg font-bold gradient-text-pink mb-2">
                {formatPrice(ad.price)}
              </p>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-white/60">{ad.shopName}</span>
                <span className="text-white/40 flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{ad.views}</span>
                </span>
              </div>

              {/* Actions */}
              {ad.status === 'pending' ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(ad.id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-sm flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(ad.id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 rounded-lg glass text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm">
                    View Details
                  </button>
                  {ad.reports > 0 && (
                    <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm">
                      Review
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ads;
