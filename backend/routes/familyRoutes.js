const express = require('express');
const router = express.Router();
const { 
  createFamily,
  deleteFamily,
  assignFamilyToUser,
  removeFamilyFromUser,
  getAllFamilyNames,
  updateFamilyPlans 
} = require('../controllers/familyController');

// Create new family
router.post('/', createFamily).get('/', getAllFamilyNames);


// Delete family by ID
router.delete('/', deleteFamily);

// Assign family to user by email and familyId
router.patch('/assign', assignFamilyToUser);

// Remove family from user by email and familyId
router.patch('/remove', removeFamilyFromUser);

// Update family plans
router.patch('/update-plans', updateFamilyPlans);

module.exports = router;
