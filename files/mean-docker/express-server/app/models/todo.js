var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Todo', {
    id: {
        type: String,
        default: ''
    },
    pwd: {
        type: String,
        default: ''
    },
    balance: {
        type: Number,
        default: 0.0
    }
});
