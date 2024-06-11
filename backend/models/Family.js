const mongoose = require('mongoose');
const { Schema } = mongoose;

const FamilySchema = new Schema({
  familyName: {
    type: String,
    required: true,
    unique: true
  },
  plans: {
    type: [String], // Array of plan names
    required: true
  }
});

const Family = mongoose.model('Family', FamilySchema);

module.exports = Family;
