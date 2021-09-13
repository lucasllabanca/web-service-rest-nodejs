const Sequelize = require('sequelize');
const sequelize = require('../database/trabalho-dm124-db');
const Option = sequelize.define('option', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    option: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, 
{
    timestamps: false
});
module.exports = Option;