const User = require('../models/UserSchema');
const Customer = require('../models/Customer');

const updateRole = async (req, res) => {
  const { email } = req.body;
  const { role } = req.body;

  try {
    // Update role in User schema
    const updatedUser = await User.findOneAndUpdate({ email }, { role }, { new: true });

    // Update role in Customer schema
    const updatedCustomer = await Customer.findOneAndUpdate({ email }, { role }, { new: true });

    res.status(200).json({ updatedUser, updatedCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateRole,
};
