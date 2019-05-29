var mongoose = require('mongoose');

// Define the Customer schema
module.exports = mongoose.model('Account', {
  customerName: {
      type: String,
      default: ''
  },
  accountId: {
      type: String,
      default: ''
  },
  balance: {
    type: Number,
    default: 0.0
  },
  income: {
      type: Number,
      default: 0.0
  },
  outcome: {
      type: Number,
      default: 0.0
  }
});