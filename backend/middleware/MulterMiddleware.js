const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) return cb(err);
      cb(null, `${buf.toString('hex')}${path.extname(file.originalname)}`);
    });
  },
});

const upload = multer({ storage });

module.exports = upload;