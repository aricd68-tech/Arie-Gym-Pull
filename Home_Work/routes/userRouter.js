

import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserEntries, 
    deleteUser 
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
 
router.post('/register', registerUser);

 
router.post('/login', loginUser);

 
router.get('/:id/entries', verifyToken, getUserEntries);

 
router.delete('/:id', verifyToken, deleteUser);

export default router;
