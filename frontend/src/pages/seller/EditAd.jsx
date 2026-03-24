import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Check,
  Camera
} from 'lucide-react';
import { electronicsCategories } from '../../data/electronicsCategories';

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    originalPrice: '',
    description: '',
    images: [],
    inStock: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Load existing ad data if editing
  useEffect(() => {
    if (!isNew) {
      // In a real app, fetch ad data from API
      // For demo, we'll use mock data
      setFormData({
        name: 'iPhone 15 Pro Max',
        category: 'mobiles',
        subcategory: 'Smartphones',
        price: '159900',
        originalPrice: '169900',
        description: 'Brand new iPhone 15 Pro Max with 1 year warranty.',
        images: [],
        inStock: true
      });
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(isNew ? 'Ad created successfully!' : 'Ad updated successfully!');
      setTimeout(() => {
        navigate('/seller/my-ads');
      }, 1500);
    }, 1000);
  };

  const selectedCategory = electronicsCategories.find(c => c.id === formData.category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/seller/my-ads')}
          className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isNew ? 'Post New Ad' : 'Edit Ad'}
          </h1>
          <p className="text-white/50 text-sm">
            {isNew ? 'Create a new product listing' : 'Update your product details'}
          </p>
        </div>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    required
                  />
                </div>

                {/* Category & Subcategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all"
                      required
                    >
                      <option value="" className="bg-[#0b0e1a]">Select category</option>
                      {electronicsCategories.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-[#0b0e1a]">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Subcategory</label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all"
                      disabled={!formData.category}
                    >
                      <option value="" className="bg-[#0b0e1a]">Select subcategory</option>
                      {selectedCategory?.subcategories.map((sub, idx) => (
                        <option key={idx} value={sub} className="bg-[#0b0e1a]">
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="Enter original price (optional)"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/70 text-sm mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                  />
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-pink-500 focus:ring-pink-500/20"
                  />
                  <label className="text-white/70">In Stock</label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Product Images</h2>
              
              {/* Image Upload */}
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-pink-500/50 transition-colors cursor-pointer">
                <Camera className="w-10 h-10 text-white/40 mx-auto mb-3" />
                <p className="text-white/60 text-sm mb-2">Drag & drop images here</p>
                <p className="text-white/40 text-xs">or click to browse</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="glass-card p-6">
              <h3 className="text-white font-medium mb-3">Tips for better results</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>Use clear, high-quality images</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>Write detailed descriptions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>Set competitive prices</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-pink-500">•</span>
                  <span>Keep your stock status updated</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/seller/my-ads')}
            className="px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-xl btn-gradient flex items-center space-x-2 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isNew ? 'Post Ad' : 'Save Changes'}</span>
                <Check className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAd;
