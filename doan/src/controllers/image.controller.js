const upload = async (req, res) => {
  // Lưu đường dẫn hình ảnh vào cơ sở dữ liệu
  const imageUrl = req.file ? req.file.path : '';

  res.status(200).json({ imageUrl });
};

module.exports = {
  upload,
};
