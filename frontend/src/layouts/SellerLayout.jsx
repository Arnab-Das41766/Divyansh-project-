import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import SellerSidebar from '../components/seller/SellerSidebar';

const SellerLayout = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if user is authenticated and is a seller
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'seller') {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen gradient-bg flex">
      <SellerSidebar />
      <main className="flex-1 ml-64 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
