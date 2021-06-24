const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'development'
});

module.exports = db;