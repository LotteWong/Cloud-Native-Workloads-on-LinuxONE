var mongoose = require('mongoose');

// Define the Transaction schema
module.exports = mongoose.model('Transaction', {
  operation: {
      type: String,
      default: ''
  },
  from: {
      type: String,
      default: ''
  },
  to: {
      type: String,
      default: ''
  },
  amount: {
      type: Number,
      default: 0.0
  },
  time: {
      type: Date,
      default: ''
  },
});