const Sequelize = require('sequelize');
const sequelize = require('../database/trabalho-dm124-db');
const Question = sequelize.define('question', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
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
module.exports = Question;