const Sequelize = require('sequelize');
const sequelize = new Sequelize('trabalho-dm124-db', 'admin', 'admin', {
  host: 'localhost',
  port: 1433,
  dialect: 'mssql',
  driver: 'tedious',
  dialectOptions: {
    instanceName: "ICCWL-033331-NB\\SQLEXPRESS01",
    trustedConnection: true     
  }, 
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = sequelize;