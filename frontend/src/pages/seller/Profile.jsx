import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  Clock,
  Camera,
  Check,
  Star
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@techworld.com',
    phone: '+91 98765 43210',
    shopName: 'TechWorld Electronics',
    address: 'Main Road, Bistupur',
    city: 'Jamshedpur',
    businessHours: '10:00 AM - 8:00 PM',
    description: 'Your trusted electronics store since 2010. We offer the best prices on mobiles, laptops, and accessories.'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-white/50 mt-1">Manage your shop information and settings.</p>
      </div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center space-x-2"
        >
          <Check className="w-5 h-5" />
          <span>{success}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="glass-card p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto">
                <Store className="w-10 h-10 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">{formData.shopName}</h2>
            <p className="text-white/50 text-sm mb-4">{formData.city}</p>
            
            {/* Rating */}
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-white/60 text-sm ml-2">(4.8)</span>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xl font-bold text-white">24</p>
                <p className="text-white/50 text-xs">Ads</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">1.2K</p>
                <p className="text-white/50 text-xs">Views</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">89</p>
                <p className="text-white/50 text-xs">Leads</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-pink-500" />
                <span className="text-white/80">{formData.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <span className="text-white/80">{formData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-cyan-500" />
                <span className="text-white/80">{formData.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-white/80">{formData.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Shop Details</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg glass text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Shop Name */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Shop Name</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Owner Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-white/70 text-sm mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                  >
                    <option value="Jamshedpur" className="bg-[#0b0e1a]">Jamshedpur</option>
                    <option value="Ranchi" className="bg-[#0b0e1a]">Ranchi</option>
                    <option value="Bokaro" className="bg-[#0b0e1a]">Bokaro</option>
                    <option value="Dhanbad" className="bg-[#0b0e1a]">Dhanbad</option>
                  </select>
                </div>

                {/* Business Hours */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Business Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      name="businessHours"
                      value={formData.businessHours}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-white/70 text-sm mb-2">About Your Shop</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex items-center justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl btn-gradient flex items-center space-x-2 disabled:opacity-70"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
