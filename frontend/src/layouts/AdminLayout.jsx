import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if user is authenticated and is an admin
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen gradient-bg flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
