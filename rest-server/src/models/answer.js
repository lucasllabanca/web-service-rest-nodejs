const Sequelize = require('sequelize');
const sequelize = require('../database/trabalho-dm124-db');
const Answer = sequelize.define('answer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    key: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
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
module.exports = Answer;