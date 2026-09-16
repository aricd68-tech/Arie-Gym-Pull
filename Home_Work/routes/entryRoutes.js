import express from 'express';
import { createEntry } from '../controllers/entryController.js';
import { checkFacilityAccess } from '../middlewares/accessMiddleware.js';

const router = express.Router();

// העברת כרטיס ורישום כניסה למתקן (רץ קודם דרך ה-accessMiddleware לבדיקת הרשאה)
router.post('/', checkFacilityAccess, createEntry);

export default router;