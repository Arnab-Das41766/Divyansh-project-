import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Eye, 
  TrendingUp, 
  Users,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  // Demo stats
  const stats = [
    {
      title: 'Total Ads',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: Package,
      color: 'pink'
    },
    {
      title: 'Active Ads',
      value: '18',
      change: '+2',
      changeType: 'positive',
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Views Today',
      value: '1,247',
      change: '+15%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'cyan'
    },
    {
      title: 'Leads',
      value: '8',
      change: '-2',
      changeType: 'negative',
      icon: Users,
      color: 'green'
    }
  ];

  // Demo recent activity
  const recentActivity = [
    { action: 'New lead received', item: 'iPhone 15 Pro Max', time: '5 minutes ago' },
    { action: 'Ad viewed', item: 'Samsung Galaxy S24', time: '12 minutes ago' },
    { action: 'Ad created', item: 'MacBook Pro M3', time: '2 hours ago' },
    { action: 'Lead converted', item: 'Sony WH-1000XM5', time: '5 hours ago' },
  ];

  // Demo top products
  const topProducts = [
    { name: 'iPhone 15 Pro Max', views: 456, leads: 12 },
    { name: 'Samsung Galaxy S24 Ultra', views: 389, leads: 8 },
    { name: 'MacBook Pro M3', views: 234, leads: 5 },
    { name: 'Sony WH-1000XM5', views: 198, leads: 4 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 mt-1">Welcome back! Here's what's happening with your listings.</p>
        </div>
        <a
          href="/seller/my-ads"
          className="px-4 py-2 rounded-xl btn-gradient flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Post New Ad</span>
        </a>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.changeType === 'positive';
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-card p-6 card-glow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">{stat.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Top Performing Products</h2>
            <a href="/seller/analytics" className="text-pink-400 hover:text-pink-300 text-sm">
              View Analytics
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Product</th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium text-sm">Views</th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium text-sm">Leads</th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium text-sm">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center text-white font-medium">
                          {index + 1}
                        </div>
                        <span className="text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-white/80">{product.views}</td>
                    <td className="py-4 px-4 text-right text-white/80">{product.leads}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                        {((product.leads / product.views) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-white/60 text-sm">{activity.item}</p>
                  <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a
            href="/seller/my-ads"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
          >
            <Package className="w-6 h-6 text-pink-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm">Manage Ads</span>
          </a>
          <a
            href="/seller/analytics"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
          >
            <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm">View Analytics</span>
          </a>
          <a
            href="/seller/profile"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
          >
            <Users className="w-6 h-6 text-cyan-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm">Edit Profile</span>
          </a>
          <a
            href="/seller/my-ads"
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
          >
            <Plus className="w-6 h-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm">Post New Ad</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
