const Plan = require('../models/Plans');

// Fetch all plans
const fetchAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error });
  }
};

// Create a plan
const createPlan = async (req, res) => {
  try {
    const { planName, products } = req.body;
    const newPlan = new Plan({ planName, products });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error });
  }
};

// Update a plan
const updatePlan = async (req, res) => {
  try {
    const { planName, products } = req.body;
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    plan.planName = planName;
    plan.products = products;
    plan.modifiedAt = Date.now();
    await plan.save();
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan', error });
  }
};

// Delete a plan
const deletePlan = async (req, res) => {
  try {
    const planName = req.body.planName;
    const planId = await Plan.findOne({ planName: planName });
    console.log(planId);
    const plan = await Plan.findByIdAndDelete(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error });
  }
};

// Fetch a plan by name
const fetchPlanByName = async (req, res) => {
  try {
    const planName = req.body.planName;
    
    const plan = await Plan.findOne({ planName: planName });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plan', error });
  }
};

module.exports = {
  fetchAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
  fetchPlanByName
};
