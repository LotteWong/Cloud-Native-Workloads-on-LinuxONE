export const AppRoutes=[
    {
        path: '',
        redirectTo: 'showmain',  //项目启动的第一个路由为showmain
        pathMatch: 'full'
    },
    {  
        path: 'showmain',
        loadChildren: './showmain/showmain.module#ShowmainModule'
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    }
]

var Todo = require('./models/todo');
var Customer = require('./models/customer');
var Account = require('./models/account');
var Transaction = require('./models/transaction');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getCustomers(res) {
    Customer.find(function (err, customers) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(customers); // return all todos in JSON format
    });
};

function getAccounts(res) {
    Account.find(function (err, accounts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(accounts); // return all todos in JSON format
    });
};

function getTransactions(res) {
    Transaction.find(function (err, transactions) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(transactions); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/customers', function (req, res) {
        // use mongoose to get all todos in the database
        getCustomers(res);
    });

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/accounts', function (req, res) {
        // use mongoose to get all todos in the database
        getAccounts(res);
    });

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/transactions', function (req, res) {
        // use mongoose to get all todos in the database
        getTransactions(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            id: req.body.id,
            pwd: req.body.pwd,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/customers', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Customer.create({
            username: req.body.username,
            password: req.body.password,
            accounts: req.body.accounts,
            done: false
        }, function (err, customer) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getCustomers(res);
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/accounts', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Account.create({
            customerName: req.body.customerName,
            accountId: req.body.accountId,
            balance: req.body.balance,
            income: req.body.income,
            outcome: req.body.outcome,
            done: false
        }, function (err, account) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getAccounts(res);
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/transactions', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Transaction.create({
            operation: req.body.operation,
            from: req.body.from,
            to: req.body.to,
            amount: req.body.amount,
            time: req.body.time,
            done: false
        }, function (err, transaction) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTransactions(res);
        });

    });

    // update a todo
    app.put('/api/todos/:todo_id', function(req, res) {

        var wherestr = {'_id': req.params.todo_id};
        console.log(wherestr);
        var updatestr = {'balance' : req.body.amount};
        console.log(updatestr);
        Todo.update(wherestr, updatestr, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    app.put('/api/customers/:customer_id',function(req,res){
        var wherestr={'_id':req.params.customer_id};
        var updatestr={'accounts' : req.body.newaccount};
        Customer.update(wherestr, updatestr, function(err,customer){
            if(err)
                res.send(err);

            getCustomers(res);
        })
    })

    app.put('/api/accounts/:account_id',function(req,res){
        var wherestr = {'_id': req.params.account_id};
        var updatestr = {'balance' : req.body.amount};
        Account.update(wherestr, updatestr, function (err, account) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getAccounts(res);
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
