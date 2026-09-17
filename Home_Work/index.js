import express from 'express';
import dotenv from 'dotenv';
import { sync } from './models/config.js';

 
import './models/subscriptionModel.js';
import './models/userModel.js';
import './models/entryModel.js';
 
import userRoutes from './routes/userRouter.js';
import entryRoutes from './routes/entryRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
 
import { apiLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

 
app.use(express.json());
app.use(apiLimiter);  

 
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/entries', entryRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

 
const startServer = async () => {
    try {
        await sync();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();