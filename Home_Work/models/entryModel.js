import { DataTypes } from 'sequelize';
import sequelize from './config.js';
import User from './userModel.js';

const Entry = sequelize.define('Entry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    facility: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entryDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// קשרי גומלין (Associations)
User.hasMany(Entry, { foreignKey: 'userId' });
Entry.belongsTo(User, { foreignKey: 'userId' });

export default Entry;
