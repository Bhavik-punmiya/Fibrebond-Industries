const express = require('express');
const router = express.Router();
const { updateRole } = require('../controllers/RoleController');

// Update role route
router.patch('/updateRole', updateRole);

module.exports = router;
