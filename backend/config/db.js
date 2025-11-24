const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); 

// Cấu hình Sequelize với MySQL online
const sequelize = new Sequelize(
  process.env.DB_NAME,      // tên database
  process.env.DB_USER,      // username
  process.env.DB_PASSWORD,  // password
  {
    host: process.env.DB_HOST, // host MySQL online
    dialect: 'mysql',
    logging: false
  }
);

// Import các model
const User = require('../models/User')(sequelize, DataTypes, bcrypt);
const Writing = require('../models/Writingsave')(sequelize, DataTypes); 

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('KẾT NỐI MySQL THÀNH CÔNG!');
        await sequelize.sync({ alter: true });
        console.log('Đồng bộ hóa Database thành công (User & Writing).');
    } catch (error) {
        console.error('LỖI KẾT NỐI DATABASE:', error.message);
        process.exit(1);
    }
};
module.exports = { sequelize, connectDB, User, Writing };
