import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { authApi } from '../services/authApi';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'seller'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For seller tab, we'll handle differently
      if (activeTab === 'seller') {
        // In the current version, sellers can access dashboard directly
        // In production, you'd validate seller credentials here
        navigate('/seller/dashboard');
        return;
      }

      const response = await authApi.login(formData);
      
      if (response.success) {
        // Store auth data
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.user.id);
        
        // Redirect based on role
        if (response.role === 'admin') {
          navigate('/admin');
        } else if (response.role === 'seller') {
          navigate('/seller/dashboard');
        } else {
          navigate('/products');
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      
      // Check if email needs verification
      if (err.response?.data?.needsVerification) {
        localStorage.setItem('verifyUserId', err.response.data.userId);
        localStorage.setItem('verifyEmail', formData.email);
        navigate('/verify-otp');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">PriceCompare</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 sm:p-10 card-glow border-t-white/10 border-l-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
          {/* Tabs */}
          <div className="flex p-1.5 bg-black/40 backdrop-blur-md rounded-xl mb-8 border border-white/5">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              User Login
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'seller'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Seller Dashboard
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {activeTab === 'user' ? 'Welcome Back!' : 'Seller Access'}
          </h2>
          <p className="text-white/50 text-center mb-6">
            {activeTab === 'user' 
              ? 'Sign in to compare prices and find the best deals'
              : 'Access your seller dashboard to manage your listings'}
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-pink-500 focus:ring-pink-500/20" />
                <span className="text-white/50 text-sm">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl btn-gradient font-semibold flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{activeTab === 'user' ? 'Sign In' : 'Access Dashboard'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-4 text-white/40 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Register Link */}
          <p className="text-center text-white/60">
            Don't have an account?{' '}
            <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
