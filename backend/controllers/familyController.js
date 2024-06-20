const Family = require('../models/Family');
const User = require('../models/UserSchema');

const createFamily = async (req, res) => {
  const { familyName, plans } = req.body;

  try {
    const existingFamily = await Family.findOne({ familyName });

    if (existingFamily) {
      return res.status(400).json({ message: 'Family already exists' });
    }

    const family = new Family({ familyName, plans });
    await family.save();
    res.status(201).json({ message: 'Family created successfully', family });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFamily = async (req, res) => {
  const { familyName } = req.body;

  try {
    const family = await Family.findOneAndDelete({ familyName });

    if (!family) {
      return res.status(404).json({ message: 'Family not found' });
    }

    res.status(200).json({ message: 'Family deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignFamilyToUser = async (req, res) => {
  const { email, familyNames } = req.body; // Expect familyNames to be an array

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find families by names
    const families = await Family.find({ familyName: { $in: familyNames } });

    if (families.length !== familyNames.length) {
      return res.status(404).json({ error: 'One or more families not found' });
    }

    // Update user's families
    const newFamilyNames = families.map(family => family.familyName);
    user.families = [...new Set([...user.families, ...newFamilyNames])]; // Merge and remove duplicates
    await user.save();

    res.status(200).json({ message: 'Families assigned to user successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const removeFamilyFromUser = async (req, res) => {
  const { email, familyNames } = req.body; // Expect familyNames to be an array

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove specified families from user
    user.families = user.families.filter(familyName => !familyNames.includes(familyName));
    await user.save();

    res.status(200).json({ message: 'Families removed from user successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFamilyNames = async (req, res) => {
  try {
    const families = await Family.find({}); // Fetch all families, but only return the familyName field
     // Extract family names
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFamilyPlans = async (req, res) => {
  const { familyName, plans } = req.body;

  try {
      const family = await Family.findOne({ familyName });

      if (!family) {
          return res.status(404).json({ message: 'Family not found' });
      }

      family.plans = plans;
      await family.save();

      res.status(200).json({ message: 'Family plans updated successfully', family });
  } catch (error) {
      res.status(500).json({ message: 'Error updating family plans', error });
  }
};

module.exports = {
  createFamily,
  deleteFamily,
  assignFamilyToUser,
  removeFamilyFromUser,
  getAllFamilyNames,
  updateFamilyPlans // Export the new function
};