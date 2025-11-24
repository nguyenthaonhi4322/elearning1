const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); 

// Cấu hình kết nối 
const sequelize = new Sequelize('elearningDB', 'root', '', { 
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});

// 👉 Import các model
const User = require('../models/User')(sequelize, DataTypes, bcrypt);
const Writing = require('../models/Writingsave')(sequelize, DataTypes); 

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('KẾT NỐI MySQL THÀNH CÔNG!');
        
        await sequelize.sync({ alter: true }); 
        console.log('Đồng bộ hóa Database thành công (User & Writing).');
    } catch (error) {
        console.error('LỖI KẾT NỐI DATABASE: Vui lòng kiểm tra XAMPP và mật khẩu.');
        console.error('Lỗi chi tiết:', error.message);
        process.exit(1); 
    }
};

// Xuất tất cả model để dùng ở các route khác
module.exports = { sequelize, connectDB, User, Writing };
