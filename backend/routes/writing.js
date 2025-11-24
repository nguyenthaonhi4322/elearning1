const express = require('express');
const router = express.Router();
const { Writing } = require('../config/db');

router.post('/save', async (req, res) => {
  try {
    const { username, promptId, title, content } = req.body;

    if (!username || !content) {
      return res.status(400).json({ success: false, message: 'Thiếu dữ liệu gửi lên' });
    }

    const writing = await Writing.create({
      username,
      promptId,
      title,
      content,
    });

    return res.json({
      success: true,
      message: ' Bài viết đã được lưu thành công!',
      data: writing,
    });
  } catch (error) {
    console.error(' Lỗi khi lưu Writing:', error);
    return res.status(500).json({ success: false, message: 'Lưu thất bại' });
  }
});

module.exports = router;
