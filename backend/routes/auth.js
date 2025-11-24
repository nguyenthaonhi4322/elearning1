const express = require('express');
const router = express.Router();
const { User } = require('../config/db');
const { Op } = require('sequelize'); 
const jwt = require('jsonwebtoken'); 

const JWT_SECRET = 'YOUR_SECRET_KEY'; 

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; 

    try {
        const existingUser = await User.findOne({ 
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });
        
        if (existingUser) {
            let message = (existingUser.email === email) ? 'Email đã được đăng ký.' : 'Tên người dùng đã tồn tại.';
            return res.status(400).json({ message });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({ 
            message: 'Đăng ký tài khoản thành công!',
            user: { id: user.id, username: user.username }
        });

    } catch (err) {
        console.error('Lỗi server khi đăng ký:', err.message);
        res.status(500).send('Lỗi Server: Không thể hoàn tất việc lưu dữ liệu.');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body; 

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Tên người dùng không tồn tại.' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng.' });
        }

        const payload = { 
            user: {
                id: user.id,
                username: user.username
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token, 
                    message: 'Đăng nhập thành công!',
                    username: user.username 
                });
            }
        );

    } catch (err) {
        console.error('Lỗi server khi đăng nhập:', err.message);
        res.status(500).send('Lỗi Server.');
    }
});

module.exports = router;
