import Subscription from '../models/subscriptionModel.js';
import User from '../models/userModel.js';
import Entry from '../models/entryModel.js';

 
export const createSubscription = async (req, res, next) => {
    try {
        const { name, price, duration, allowedFacilities } = req.body;
        const newSub = await Subscription.create({
            name,
            price,
            duration,
            allowedFacilities
        });
        res.status(201).json(newSub);
    } catch (error) {
        next(error);
    }
};

 
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.findAll({ include: User });
        res.status(200).json(subscriptions);
    } catch (error) {
        next(error);
    }
};

 
export const getStats = async (req, res, next) => {
    try {
        const totalUsers = await User.count();
        const totalEntries = await Entry.count();
        const subscriptions = await Subscription.findAll({ include: User });

        let totalRevenue = 0;
        subscriptions.forEach(sub => {
            totalRevenue += sub.price * sub.Users.length;
        });

        res.status(200).json({
            totalMembers: totalUsers,
            totalFacilityEntries: totalEntries,
            estimatedRevenue: totalRevenue
        });
    } catch (error) {
        next(error);
    }
};