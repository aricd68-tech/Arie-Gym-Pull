import User from '../models/userModel.js';
import Subscription from '../models/subscriptionModel.js';

export const checkFacilityAccess = async (req, res, next) => {
    const { userId, facility } = req.body;

    try {
        // שליפת המשתמש יחד עם נתוני המנוי שלו
        const user = await User.findByPk(userId, {
            include: Subscription
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (!user.Subscription) {
            return res.status(403).json({ error: "User has no active subscription." });
        }

        const allowed = user.Subscription.allowedFacilities; // לדוגמה: 'Gym', 'Pool', או 'All'

        // בדיקה האם יש הרשאה למתקן המבוקש
        if (allowed !== 'All' && allowed !== facility) {
            return res.status(403).json({
                error: `Access Denied: Your subscription (${user.Subscription.name}) does not allow entry to the ${facility}.`
            });
        }

        next(); // מעבר לשלב הרישום
    } catch (error) {
        next(error);
    }
};