import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Store, 
  Package, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalAccounts: 0,
    verifiedUsers: 0,
    newUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminApi.getDashboardStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dashboardStats = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'pink',
      link: '/admin/users'
    },
    {
      title: 'Total Sellers',
      value: stats.totalSellers,
      change: '+8%',
      changeType: 'positive',
      icon: Store,
      color: 'purple',
      link: '/admin/sellers'
    },
    {
      title: 'Active Ads',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: Package,
      color: 'cyan',
      link: '/admin/ads'
    },
    {
      title: 'Revenue',
      value: '₹2.4L',
      change: '+15%',
      changeType: 'positive',
      icon: CreditCard,
      color: 'green',
      link: '/admin/payments'
    }
  ];

  // Demo recent users
  const recentUsers = [
    { name: 'Rahul Kumar', email: 'rahul@example.com', role: 'user', date: '2 min ago' },
    { name: 'TechZone Store', email: 'techzone@example.com', role: 'seller', date: '15 min ago' },
    { name: 'Priya Sharma', email: 'priya@example.com', role: 'user', date: '1 hour ago' },
    { name: 'Mobile Hub', email: 'mobilehub@example.com', role: 'seller', date: '2 hours ago' },
  ];

  // Demo recent activity
  const recentActivity = [
    { action: 'New user registered', detail: 'rahul@example.com', time: '2 min ago' },
    { action: 'Seller approved', detail: 'TechZone Store', time: '15 min ago' },
    { action: 'New ad posted', detail: 'iPhone 15 Pro Max', time: '30 min ago' },
    { action: 'Payment received', detail: '₹5,000 from Mobile Hub', time: '1 hour ago' },
    { action: 'User verification', detail: 'priya@example.com verified', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/50 mt-1">Overview of platform performance and statistics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.changeType === 'positive';
          
          return (
            <motion.a
              key={index}
              href={stat.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 card-glow block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">{stat.title}</p>
              <p className="text-3xl font-bold text-white mt-1">
                {isLoading ? '-' : stat.value}
              </p>
            </motion.a>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Users</h2>
            <a href="/admin/users" className="text-pink-400 hover:text-pink-300 text-sm flex items-center space-x-1">
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">User</th>
                  <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Role</th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium text-sm">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                          <span className="text-white font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/50 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'seller' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-pink-500/20 text-pink-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-white/60 text-sm">{user.date}</td>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <Activity className="w-5 h-5 text-white/40" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-white/60 text-sm">{activity.detail}</p>
                  <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Platform Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Total Accounts</p>
            <p className="text-2xl font-bold text-white">{stats.totalAccounts}</p>
            <p className="text-green-400 text-sm mt-1">+{stats.newUsers} this week</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Verified Users</p>
            <p className="text-2xl font-bold text-white">{stats.verifiedUsers}</p>
            <p className="text-white/40 text-sm mt-1">
              {((stats.verifiedUsers / stats.totalAccounts) * 100).toFixed(0)}% of total
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Pending Verifications</p>
            <p className="text-2xl font-bold text-white">{stats.totalAccounts - stats.verifiedUsers}</p>
            <p className="text-yellow-400 text-sm mt-1">Action required</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Active Sessions</p>
            <p className="text-2xl font-bold text-white">42</p>
            <p className="text-green-400 text-sm mt-1">Currently online</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
