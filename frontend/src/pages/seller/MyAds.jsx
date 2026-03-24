import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  TrendingUp,
  Pause,
  Play
} from 'lucide-react';
import { demoProducts, formatPrice } from '../../data/electronicsCategories';

const MyAds = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ads, setAds] = useState(demoProducts.slice(0, 6).map(p => ({ ...p, status: 'active' })));

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (id) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, status: ad.status === 'active' ? 'paused' : 'active' } : ad
    ));
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      setAds(ads.filter(ad => ad.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Ads</h1>
          <p className="text-white/50 mt-1">Manage your product listings and track performance.</p>
        </div>
        <a
          href="/seller/edit-ad/new"
          className="px-4 py-2 rounded-xl btn-gradient flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Post New Ad</span>
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Total Ads</p>
          <p className="text-2xl font-bold text-white">{ads.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">{ads.filter(a => a.status === 'active').length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Paused</p>
          <p className="text-2xl font-bold text-yellow-400">{ads.filter(a => a.status === 'paused').length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-white/60 text-sm">Total Views</p>
          <p className="text-2xl font-bold text-pink-400">2.4K</p>
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
            placeholder="Search your ads..."
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
          <option value="paused" className="bg-[#0b0e1a]">Paused</option>
        </select>
      </div>

      {/* Ads Grid */}
      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAds.map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={ad.image}
                  alt={ad.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ad.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {ad.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(ad.id)}
                      className="p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                      title={ad.status === 'active' ? 'Pause' : 'Activate'}
                    >
                      {ad.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <a
                      href={`/seller/edit-ad/${ad.id}`}
                      className="p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="p-2 rounded-lg bg-black/60 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-1">{ad.name}</h3>
                <p className="text-xl font-bold gradient-text-pink mb-3">
                  {formatPrice(ad.price)}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-white/60">
                      <Eye className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/60">
                      <TrendingUp className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 50) + 5}</span>
                    </div>
                  </div>
                  <span className="text-white/40 text-xs">{ad.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-white/30" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No ads found</h3>
          <p className="text-white/50 mb-6">Start by creating your first product listing</p>
          <a
            href="/seller/edit-ad/new"
            className="px-6 py-3 rounded-xl btn-gradient inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Ad</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default MyAds;
