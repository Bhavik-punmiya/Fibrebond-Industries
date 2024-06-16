const Family = require('../models/Family');
const User = require('../models/UserSchema');

const createFamily = async (req, res) => {
  const { familyName, plans } = req.body;

  try {
    const family = await Family.create({ familyName, plans });
    res.status(201).json({ family });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFamily = async (req, res) => {
  const { id } = req.params;

  try {
    await Family.findByIdAndDelete(id);
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
    const families = await Family.find({}, 'familyName'); // Fetch all families, but only return the familyName field
    const familyNames = families.map(family => family.familyName); // Extract family names
    res.status(200).json(familyNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFamily,
  deleteFamily,
  assignFamilyToUser,
  removeFamilyFromUser,
  getAllFamilyNames, // Export the new function
};