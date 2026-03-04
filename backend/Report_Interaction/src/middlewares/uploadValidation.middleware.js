const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==============================
// Storage Configuration
// ==============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const reportId = req.params.reportId


    const extension = path.extname(file.originalname);
    
    const filename = `${reportId}-resolved${extension}`
    cb(null,filename);
  }
});

// ==============================
// File Filter (Security)
// ==============================
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPG, JPEG, PNG files allowed"), false);
  }

  cb(null, true);
};

// ==============================
// Upload Config
// ==============================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;

