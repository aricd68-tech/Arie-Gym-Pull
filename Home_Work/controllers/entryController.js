import Entry from '../models/entryModel.js';

export const createEntry = async (req, res, next) => {
    try {
        const { userId, facility } = req.body;

        const newEntry = await Entry.create({
            userId,
            facility
        });

        res.status(200).json({
            message: `Access granted to ${facility}`,
            entry: newEntry
        });
    } catch (error) {
        next(error);
    }
};