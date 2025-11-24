const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true 
    });

    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });

    User.prototype.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };

    User.associate = (models) => {
    // Một người dùng có nhiều bài viết (Has Many Writings)
    User.hasMany(models.Writing, {
        foreignKey: 'userId', // Khóa ngoại trong bảng writings
        as: 'writings',
        onDelete: 'CASCADE',
    });
};
    return User; 
};
