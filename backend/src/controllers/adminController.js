import db from '../db.js';
import bcrypt from 'bcryptjs';

// ──────────────────────────────────────────────
// Get all users (with optional role filter + search + pagination)
// ──────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Build WHERE clauses dynamically
    const conditions = [];
    const params = [];

    if (role) {
      conditions.push('role = ?');
      params.push(role);
    }

    if (search) {
      conditions.push('(name LIKE ? OR email LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const users = db.prepare(`
      SELECT id, name, email, role, is_verified, shop_name, phone, address, city, avatar, created_at, updated_at
      FROM users
      ${where}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const total = db.prepare(
      `SELECT COUNT(*) as count FROM users ${where}`
    ).get(...params).count;

    res.status(200).json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// ──────────────────────────────────────────────
// Get user by ID
// ──────────────────────────────────────────────
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = db.prepare(
      'SELECT id, name, email, role, is_verified, shop_name, phone, address, city, avatar, created_at, updated_at FROM users WHERE id = ?'
    ).get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
};

// ──────────────────────────────────────────────
// Create user (admin only — auto-verified)
// ──────────────────────────────────────────────
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, shopName } = req.body;

    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const { genSalt, hash } = await import('bcryptjs');
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const userRole = role || 'user';
    const userShopName = userRole === 'seller' ? (shopName || null) : null;

    const result = db.prepare(`
      INSERT INTO users (name, email, password, role, shop_name, is_verified)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(name, email.toLowerCase(), hashedPassword, userRole, userShopName);

    const userId = result.lastInsertRowid;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: userId,
        name,
        email: email.toLowerCase(),
        role: userRole
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
};

// ──────────────────────────────────────────────
// Update user
// ──────────────────────────────────────────────
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isVerified, shopName, phone, address, city } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Build SET clause dynamically for only provided fields
    const updates = [];
    const params = [];

    if (name !== undefined)       { updates.push('name = ?');        params.push(name); }
    if (email !== undefined)      { updates.push('email = ?');       params.push(email.toLowerCase()); }
    if (role !== undefined)       { updates.push('role = ?');        params.push(role); }
    if (isVerified !== undefined) { updates.push('is_verified = ?'); params.push(isVerified ? 1 : 0); }
    if (shopName !== undefined)   { updates.push('shop_name = ?');   params.push(shopName); }
    if (phone !== undefined)      { updates.push('phone = ?');       params.push(phone); }
    if (address !== undefined)    { updates.push('address = ?');     params.push(address); }
    if (city !== undefined)       { updates.push('city = ?');        params.push(city); }

    updates.push("updated_at = datetime('now')");

    db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params, id);

    const updated = db.prepare(
      'SELECT id, name, email, role, is_verified FROM users WHERE id = ?'
    ).get(id);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updated
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

// ──────────────────────────────────────────────
// Delete user
// ──────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting yourself
    if (parseInt(id) === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

// ──────────────────────────────────────────────
// Dashboard statistics
// ──────────────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    const count = (where) =>
      db.prepare(`SELECT COUNT(*) as n FROM users WHERE ${where}`).get().n;

    const totalUsers      = count("role = 'user'");
    const totalSellers    = count("role = 'seller'");
    const totalAdmins     = count("role = 'admin'");
    const verifiedUsers   = count('is_verified = 1');
    const unverifiedUsers = count('is_verified = 0');
    const newUsers        = count("created_at >= datetime('now', '-7 days')");

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalSellers,
        totalAdmins,
        verifiedUsers,
        unverifiedUsers,
        newUsers,
        totalAccounts: totalUsers + totalSellers + totalAdmins
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// ──────────────────────────────────────────────
// Get all sellers (with optional search + city filter + pagination)
// ──────────────────────────────────────────────
export const getAllSellers = async (req, res) => {
  try {
    const { search, city, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = ["role = 'seller'"];
    const params = [];

    if (city) {
      conditions.push('city = ?');
      params.push(city);
    }

    if (search) {
      conditions.push('(name LIKE ? OR email LIKE ? OR shop_name LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const where = 'WHERE ' + conditions.join(' AND ');

    const sellers = db.prepare(`
      SELECT id, name, email, role, is_verified, shop_name, phone, address, city, avatar, created_at, updated_at
      FROM users
      ${where}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    const total = db.prepare(
      `SELECT COUNT(*) as count FROM users ${where}`
    ).get(...params).count;

    res.status(200).json({
      success: true,
      sellers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sellers',
      error: error.message
    });
  }
};
