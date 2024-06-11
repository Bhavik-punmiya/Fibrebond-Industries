const Family = require('../models/Family');
const User = require('../models/UserSchema');
const Customer = require('../models/Customer');


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
    const { email, familyName } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find family by name
      const family = await Family.findOne({ familyName });
  
      if (!family) {
        return res.status(404).json({ error: 'Family not found' });
      }
  
      // Update user's family
      user.families.push(family); // Push the entire family object
      await user.save();
  
      res.status(200).json({ message: 'Family assigned to user successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
const removeFamilyFromUser = async (req, res) => {
  const { email, familyId } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Logic to remove family from user
    // This is just a placeholder, you need to implement your own logic here

    res.status(200).json({ message: 'Family removed from user successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFamily,
  deleteFamily,
  assignFamilyToUser,
  removeFamilyFromUser,
};
