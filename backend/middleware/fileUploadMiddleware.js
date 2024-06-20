const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
