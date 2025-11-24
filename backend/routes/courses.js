const express = require('express');
const router = express.Router();

// Ví dụ 1 route test để chắc chắn server không lỗi
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Courses route hoạt động!"
  });
});

module.exports = router;
