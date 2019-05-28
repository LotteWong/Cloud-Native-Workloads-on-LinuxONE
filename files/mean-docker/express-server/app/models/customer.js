var mongoose = require('mongoose');

// Define the Customer schema
module.exports = mongoose.model('Customer', {
  username: {
      type: String,
      default: ''
  },
  password: {
      type: String,
      default: ''
  },
  accounts: [{
      type: String,
      default: ''
  }]
});