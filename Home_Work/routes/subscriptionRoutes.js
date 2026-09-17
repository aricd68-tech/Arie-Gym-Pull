import express from 'express';
import { 
    createSubscription, 
    getAllSubscriptions, 
    getStats 
} from '../controllers/subscriptionController.js';

const router = express.Router();

 
router.post('/', createSubscription);
 
router.get('/', getAllSubscriptions);

 
router.get('/stats', getStats);

export default router;
