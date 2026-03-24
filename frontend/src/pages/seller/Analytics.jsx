import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, Eye, Phone } from 'lucide-react';

const Analytics = () => {
  // Demo data for charts
  const viewsData = [
    { name: 'Mon', views: 400, leads: 24 },
    { name: 'Tue', views: 300, leads: 18 },
    { name: 'Wed', views: 550, leads: 32 },
    { name: 'Thu', views: 450, leads: 27 },
    { name: 'Fri', views: 600, leads: 38 },
    { name: 'Sat', views: 800, leads: 48 },
    { name: 'Sun', views: 700, leads: 42 },
  ];

  const categoryData = [
    { name: 'Mobiles', value: 35, color: '#ec4899' },
    { name: 'Laptops', value: 25, color: '#a855f7' },
    { name: 'Audio', value: 20, color: '#06b6d4' },
    { name: 'Gaming', value: 15, color: '#22c55e' },
    { name: 'Others', value: 5, color: '#f59e0b' },
  ];

  const monthlyData = [
    { name: 'Jan', sales: 65 },
    { name: 'Feb', sales: 78 },
    { name: 'Mar', sales: 90 },
    { name: 'Apr', sales: 81 },
    { name: 'May', sales: 96 },
    { name: 'Jun', sales: 105 },
  ];

  const stats = [
    { title: 'Total Views', value: '12.5K', change: '+23%', icon: Eye },
    { title: 'Total Leads', value: '486', change: '+15%', icon: Phone },
    { title: 'Conversion Rate', value: '3.9%', change: '+0.5%', icon: TrendingUp },
    { title: 'Unique Visitors', value: '8.2K', change: '+18%', icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-white/50 mt-1">Track your performance and understand your customers.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-pink-500" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <p className="text-white/60 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views & Leads Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Views & Leads (Last 7 Days)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0b0e1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#ec4899" 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  name="Views"
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#a855f7" 
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                  name="Leads"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Sales by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0b0e1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/60 text-sm">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Monthly Sales Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0b0e1a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="url(#salesGradient)" 
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Best Performing Day</p>
            <p className="text-white font-semibold">Saturday</p>
            <p className="text-green-400 text-sm mt-1">+45% above average</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Top Category</p>
            <p className="text-white font-semibold">Mobiles</p>
            <p className="text-green-400 text-sm mt-1">35% of total sales</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Avg. Response Time</p>
            <p className="text-white font-semibold">2.5 hours</p>
            <p className="text-green-400 text-sm mt-1">Better than 80% sellers</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
