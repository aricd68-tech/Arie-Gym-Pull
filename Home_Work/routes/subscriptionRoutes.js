import express from 'express';
import { 
    createSubscription, 
    getAllSubscriptions, 
    getStats 
} from '../controllers/subscriptionController.js';

const router = express.Router();

// יצירת סוג מנוי חדש
router.post('/', createSubscription);

// קבלת כל סוגי המנויים הקיימים
router.get('/', getAllSubscriptions);

// שליפת דוח סטטיסטיקות והכנסות עבור ההנהלה
router.get('/stats', getStats);

export default router;
