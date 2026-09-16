import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Subscription from '../models/subscriptionModel.js';
import Entry from '../models/entryModel.js';

// יצירת משתמש חדש (הרשמה)
export const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password, subscriptionTypeId } = req.body;

        if (!fullName || !email || !password || !subscriptionTypeId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            subscriptionTypeId
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: newUser.id
        });
    } catch (error) {
        next(error);
    }
};

// התחברות והנפקת טוקן JWT
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secretKey123',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
};

// שליפת היסטוריית כניסות למשתמש ספציפי
export const getUserEntries = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [Entry, Subscription]
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// מחיקת משתמש
export const deleteUser = async (req, res, next) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};