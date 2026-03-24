import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  UserPlus,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, roleFilter, searchQuery]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getAllUsers({
        page: currentPage,
        limit: 10,
        search: searchQuery,
        role: roleFilter
      });
      
      if (response.success) {
        setUsers(response.users);
        setTotalPages(response.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await adminApi.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-white/50 mt-1">Manage user accounts and permissions.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl btn-gradient flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
        >
          <option value="" className="bg-[#0b0e1a]">All Roles</option>
          <option value="user" className="bg-[#0b0e1a]">User</option>
          <option value="seller" className="bg-[#0b0e1a]">Seller</option>
          <option value="admin" className="bg-[#0b0e1a]">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-white/60 font-medium">User</th>
                <th className="text-left py-4 px-6 text-white/60 font-medium">Role</th>
                <th className="text-left py-4 px-6 text-white/60 font-medium">Status</th>
                <th className="text-left py-4 px-6 text-white/60 font-medium">Joined</th>
                <th className="text-right py-4 px-6 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/50 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-red-500/20 text-red-400'
                          : user.role === 'seller'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-pink-500/20 text-pink-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`flex items-center space-x-1 text-sm ${
                        user.isVerified ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {user.isVerified ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            <span>Pending</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-white/60 text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-white/60 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <p className="text-white/50">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg glass text-white/60 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-white/60">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg glass text-white/60 hover:text-white disabled:opacity-50"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
