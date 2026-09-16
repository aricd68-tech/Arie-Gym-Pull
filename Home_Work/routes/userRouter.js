

import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserEntries, 
    deleteUser 
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// הרשמת משתמש
router.post('/register', registerUser);

// התחברות
router.post('/login', loginUser);

// היסטוריית כניסות של משתמש (מוגן)
router.get('/:id/entries', verifyToken, getUserEntries);

// מחיקת משתמש (מוגן)
router.delete('/:id', verifyToken, deleteUser);

export default router;
