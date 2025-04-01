const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Allowed file types (Images, PDFs, and text files)
const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/plain",
];

// Blocked file extensions (Executable & Malware files)
const BLOCKED_EXTENSIONS = [
    ".exe", ".bat", ".sh", ".cmd", ".js", ".msi", ".dll", ".php", ".py", ".html"
];

// Dynamic Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDirectory = path.join(__dirname, "../uploads/temp");

        // Ensure directory exists
        fs.mkdirSync(uploadDirectory, { recursive: true });

        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// File Filter to Allow Only Safe Files
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (!ALLOWED_FILE_TYPES.includes(file.mimetype) || BLOCKED_EXTENSIONS.includes(ext)) {
        return cb(new Error("Invalid file type! Only images, PDFs, and text files are allowed."), false);
    }

    cb(null, true);
};

// Multer Upload Middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
}).array("files", 10); // Accept multiple files under "files" key

// Generic File Upload Function
const uploadFiles = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) return reject(err);

            // Return file paths
            const uploadedFiles = req.files ? req.files.map(file => file.path) : [];
            resolve(uploadedFiles);
        });
    });
};

// Export the upload middleware and the uploadFiles function
module.exports = {
    upload,
    uploadFiles,
};