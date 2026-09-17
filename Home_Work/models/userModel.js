import { DataTypes } from 'sequelize';
import sequelize from './config.js';
import bcrypt from 'bcrypt';
import Subscription from './subscriptionModel.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
        }
    }
});

 
Subscription.hasMany(User, { foreignKey: 'subscriptionTypeId' });
User.belongsTo(Subscription, { foreignKey: 'subscriptionTypeId' });

export default User;