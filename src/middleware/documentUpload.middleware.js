const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Base upload directory
const baseDir = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine subdirectory based on fieldname or route
    let subDir = "docs";
    if (file.fieldname === "nda") subDir = "ndas";
    if (file.fieldname === "vault") subDir = "vault";
    if (file.fieldname === "map" || file.fieldname === "image") subDir = "images";
    
    const finalDir = path.join(baseDir, subDir);
    
    if (!fs.existsSync(finalDir)) {
      fs.mkdirSync(finalDir, { recursive: true });
    }
    cb(null, finalDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    const uniqueName = `${Date.now()}-${cleanName}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|xlsx|csv|jpg|jpeg|png|webp/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported. Allowed: pdf, doc, docx, xlsx, csv, jpg, jpeg, png, webp"), false);
  }
};

const documentUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB
});

module.exports = documentUpload;
