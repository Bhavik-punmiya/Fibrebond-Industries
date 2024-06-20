const express = require('express');
const {
  fetchAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
  fetchPlanByName,
} = require('../controllers/planController');

const router = express.Router();

router.get('/', fetchAllPlans);
router.post('/', createPlan);
router.put('/:id', updatePlan);
router.delete('/', deletePlan);
router.get('/single', fetchPlanByName);

module.exports = router;
