const jwt = require('jsonwebtoken');

const JWT_SECRET = 'YOUR_SECRET_KEY'; 

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token, truy cập bị từ chối.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);   
        req.user = decoded.user;  
        next();
        
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ.' });
    }
};
