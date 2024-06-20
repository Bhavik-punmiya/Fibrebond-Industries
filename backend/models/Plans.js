const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  products: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Plan', PlanSchema);
