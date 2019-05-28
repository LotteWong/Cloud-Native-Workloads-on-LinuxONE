var mongoose = require('mongoose');

// Define the Todo schema
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

/*
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
    account_id: [{
        type: String,
        default: ''
    }]
});

// Define the Account schema
module.exports = mongoose.model('Account', {
    account_id: {
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

// Define the Transaction schema
module.exports = mongoose.model('Transaction', {
    type: {
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

// Define the Finance schema
module.exports = mongoose.model('Finance', {
    type: {
        type: String,
        default: '',
    },
    rate: {
        type: Number,
        default: 0.0
    },
    interest: {
        type: Number,
        default: 0.0
    }
});
*/