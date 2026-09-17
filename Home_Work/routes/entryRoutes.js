import express from 'express';
import { createEntry } from '../controllers/entryController.js';
import { checkFacilityAccess } from '../middlewares/accessMiddleware.js';

const router = express.Router();

 
router.post('/', checkFacilityAccess, createEntry);

export default router;