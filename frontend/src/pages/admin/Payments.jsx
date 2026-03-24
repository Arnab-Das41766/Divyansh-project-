import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const Payments = () => {
  // Demo revenue data
  const revenueData = [
    { name: 'Jan', revenue: 45000, expenses: 15000 },
    { name: 'Feb', revenue: 52000, expenses: 18000 },
    { name: 'Mar', revenue: 48000, expenses: 16000 },
    { name: 'Apr', revenue: 61000, expenses: 20000 },
    { name: 'May', revenue: 58000, expenses: 19000 },
    { name: 'Jun', revenue: 72000, expenses: 22000 },
  ];

  // Demo transactions
  const transactions = [
    { id: 'TXN001', seller: 'TechWorld Electronics', amount: 5000, type: 'commission', date: '2024-06-15', status: 'completed' },
    { id: 'TXN002', seller: 'Mobile Planet', amount: 3500, type: 'commission', date: '2024-06-14', status: 'completed' },
    { id: 'TXN003', seller: 'Digital Hub', amount: 2800, type: 'commission', date: '2024-06-13', status: 'pending' },
    { id: 'TXN004', seller: 'TechWorld Electronics', amount: 4200, type: 'commission', date: '2024-06-12', status: 'completed' },
    { id: 'TXN005', seller: 'Sound & Vision', amount: 1500, type: 'commission', date: '2024-06-11', status: 'completed' },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3.2L',
      change: '+18%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'This Month',
      value: '₹72K',
      change: '+12%',
      changeType: 'positive',
      icon: CreditCard
    },
    {
      title: 'Pending',
      value: '₹8.5K',
      change: '-5%',
      changeType: 'negative',
      icon: TrendingDown
    },
    {
      title: 'Total Transactions',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: ArrowUpRight
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Payments</h1>
        <p className="text-white/50 mt-1">Track revenue, commissions, and transactions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.changeType === 'positive';
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-pink-500" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-6">Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
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
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#ec4899" 
                strokeWidth={2}
                dot={{ fill: '#ec4899' }}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#a855f7" 
                strokeWidth={2}
                dot={{ fill: '#a855f7' }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
          <button className="text-pink-400 hover:text-pink-300 text-sm">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Transaction ID</th>
                <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Seller</th>
                <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Type</th>
                <th className="text-right py-3 px-4 text-white/60 font-medium text-sm">Amount</th>
                <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Date</th>
                <th className="text-left py-3 px-4 text-white/60 font-medium text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-white font-mono text-sm">{txn.id}</td>
                  <td className="py-4 px-4 text-white">{txn.seller}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs capitalize">
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-white font-medium">
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-white/60 text-sm">{txn.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      txn.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Commission Structure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-6">Commission Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Standard Commission</p>
            <p className="text-3xl font-bold text-white">5%</p>
            <p className="text-white/40 text-sm mt-1">For all transactions</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Premium Sellers</p>
            <p className="text-3xl font-bold text-white">3%</p>
            <p className="text-white/40 text-sm mt-1">For verified sellers</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm mb-2">Bulk Discount</p>
            <p className="text-3xl font-bold text-white">2%</p>
            <p className="text-white/40 text-sm mt-1">For high volume sellers</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payments;
