import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats,
  getAllSellers
} from '../controllers/adminController.js';
import { verifyToken, verifyRole } from '../middlewares/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyToken, verifyRole(['admin']));

// Dashboard statistics
router.get('/dashboard-stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Seller management
router.get('/sellers', getAllSellers);

// Placeholder routes for future implementation
router.get('/ads', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ads endpoint - To be implemented',
    ads: []
  });
});

router.get('/payments', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Payments endpoint - To be implemented',
    payments: []
  });
});

export default router;
