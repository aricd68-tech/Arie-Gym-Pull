import { DataTypes } from 'sequelize';
import sequelize from './config.js';

const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    allowedFacilities: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Subscription;