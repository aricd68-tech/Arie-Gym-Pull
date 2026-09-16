import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || './db.sqlite',
    logging: false
});

export const sync = async () => {
    try {
        await sequelize.sync();
        console.log("Database synced and db.sqlite ready!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

export default sequelize;