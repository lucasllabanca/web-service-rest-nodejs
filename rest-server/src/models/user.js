const Sequelize = require('sequelize');
const sequelize = require('../database/trabalho-dm124-db');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        isIn: [['ADMIN', 'USER']]
    },
    createdAt: {
        field: 'creationDate',
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        field: 'modifiedDate',
        type: Sequelize.DATE,
        allowNull: false
    }
}, 
{
    timestamps: true,
});
module.exports = User;