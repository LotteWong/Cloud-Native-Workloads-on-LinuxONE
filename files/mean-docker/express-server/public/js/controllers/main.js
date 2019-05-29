angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', 'Customers', 'Accounts', 'Transactions', function($scope, $http, Todos, Customers, Accounts, Transactions) {
		$scope.customerData = {}; // 绑定前端的客户数据
		$scope.accountData = {}; // 绑定前端的账户数据
		$scope.transactionData = {}; // 绑定前端的交易记录数据

		$scope.currCustomer = {}; // 绑定数据库的客户数据
		$scope.currAccount = {}; // 绑定数据库的账户数据
		$scope.currTransaction = {}; // 绑定数据库的交易交路数据

		$scope.selectedAccount = {}; // 选中的账号

		$scope.operationAmount; // 操作的金额

		/* 以下是原Todo的数据，暂时用不到了 */
		// $scope.formData = {};
		// $scope.loading = true;
		// $scope.selected;

		/* 以下是暂时硬编码的数据，可以根据需要修改 */
		$scope.balance = 1024;
		$scope.income = 233;
		$scope.outcome = 666;
		$scope.customer = {
			username: "LotteWong",
			password: "password",
			lastSuccessfulLogin: "20190528",
			account: "ICBCAccount",
			balance: 1024,
			income: 233,
			outcome: 666,
		};
		$scope.finance = {
			type: "Yu'E Bao",
			rate: "2.33%",
			interest: "6.66",
		};

		// 读取当前客户信息，更新$scope.currCustomer
		// ......
		// 参考代码： 	
		// Accounts.get()
		// 	.success(function(data) {
		//		$scope.accounts = data;
		//		$scope.loading = false;
		//	});

		// 添加未注册的客户
		$scope.signUp = function() {
			// 情况一：不存在该客户则向数据库插入新的Customer元组
			// ......
			
			// 情况二：已存在该客户则alert提醒并清空form
			// ......

			// 最简单什么都不考虑的情况：
			if ($scope.customerData.username != undefined && $scope.customerData.password != undefined) {
				console.log($scope.customerData.username);
				console.log($scope.customerData.password);

				var dateTime = new Date();
				$scope.customerData.lastSuccessfulLogin = dateTime.toLocaleString();

				var msg = JSON.stringify($scope.customerData);
				console.log(msg);

				Customers.create($scope.customerData).success(function(data) {
						var msg = JSON.stringify(data);
						console.log(msg);
					
						$scope.currCustomer = $scope.customerData;
						$scope.customerData = {};
						$scope.customers = data;
					});
			}
		};

		// 检查已存在的客户
		$scope.signIn = function() {
			// 情况一：不存在该客户则alert提醒并清空form
			// ......

			// 情况二：输入密码错误则alert提醒并清空form
			// ......

			// 情况三：客户密码匹配则读取客户关联的账户
			// 更新前端显示上次登录时间
			// 更新数据库存储本次登录时间
			// ......
		};

		// 计算该个客户所有账户的余额
		$scope.getBalance = function() {
			// ......
		}

		// 计算该个客户所有账户的收入
		$scope.getIncome = function() {
			// ......
		}

		// 计算该个客户所有账户的支出
		$scope.getOutcome = function() {
			// ......
		}

		// 取消转账
		$scope.cancelTransfer = function() {
			// 清空form
			// ......
		}
		
		//确认转账
		$scope.confirmTransfer = function() {
			// 更新自己的余额和支出
			// ......

			// 更新对方的余额和收入
			// ......

			// 更新自己的交易记录
			// ......
		}

		// 交易记录显示还没有头绪，先码着
		// ......

		// 已有账户显示
		Accounts.get()
			.success(function(data) {
				$scope.accounts = data;
				$scope.loading = false;
			});

		// 读取当前账户信息，更新$scope.currAccount
		$scope.selectAccount = function(id) {
			// ......
		};

		// 取消开户
		$scope.cancelAccount = function() {
			// 清空form
			// ......
		};

		// 确认开户
		$scope.createAccount = function() {
			// 情况一：不存在该账户则向数据库插入新的Account元组
			// 同时更新客户的数据
			// ......
			
			// 情况二：已存在该账户则alert提醒并清空form
			// ......

			// 最简单什么都不考虑的情况：
			if ($scope.accountData.accountName != undefined) {
				console.log($scope.accountData.accountName);

				$scope.loading = true;

				$scope.accountData.customerName = $scope.currCustomer.username;

				console.log($scope.accountData.customerName);

				var msg = JSON.stringify($scope.accountData);
				console.log(msg);

				var dateTime = new Date();
				$scope.transactionData.operation = 'Create';
				$scope.transactionData.from = $scope.selectedAccount.accountId;
				$scope.transactionData.time = dateTime.toLocaleString();

				var msg = JSON.stringify($scope.transactionData);
				console.log(msg);

				Accounts.create($scope.accountData).success(function(data) {
						var msg = JSON.stringify(data);
						console.log(msg);
					
						$scope.loading = false;
						$scope.currAccount = $scope.accountData;
						$scope.accountData = {};
						$scope.accounts = data;
						// 更新当前客户的数据库账户数据

						Transactions.create($scope.tra)
					});
			}
		};

		// 存款
		$scope.deposit = function() {
			// 注意更新交易记录
			// ......
		};

		// 取款
		$scope.withdraw = function() {
			// 注意更新交易记录
			// 注意不够钱取款的错误处理
			// ......
		};

		// 理财产品显示还没有头绪，先码着
		// ......

		/* 以下是原Todo的函数，暂时用不到了 */
		/*
		// GET ==================================================================
		// get a todo when browsering	
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.id != undefined && $scope.formData.pwd != undefined) {
				$scope.loading = true;

				console.log($scope.formData.id);
				console.log($scope.formData.pwd);

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}

		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			console.log("exisited id: " + id);
			
			// $scope.loading = true;

			// Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				// .success(function(data) {
					// $scope.loading = false;
					// $scope.todos = data; // assign our new list of todos
				// });

			$scope.selected = id;

			console.log("selected id: " + $scope.selected);
		};

		$scope.query = function() {			
			Todos.get()
				.success(function(data) {
					var msg = JSON.stringify(data);
					console.log(msg);
					
					$scope.loading = true;
					for(var idx in data) {
						console.log("item id: " + data[idx]["_id"]);
						console.log("selected id: " + $scope.selected);
						if(data[idx]["_id"] == $scope.selected) {
							console.log("Query " + data[idx]["balance"] + " yuan");
							alert("Query " + data[idx]["balance"] + " yuan");
						}
					}
					$scope.amount = '';
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		}
		
		$scope.deposit = function() {
			alert("Deposit " + $scope.amount + " yuan");
			
			Todos.get()
				.success(function(data) {
					var msg = JSON.stringify(data);
					console.log(msg);
					
					for(var idx in data) {
						console.log("item id: " + data[idx]["_id"]);
						console.log("selected id: " + $scope.selected);
						if(data[idx]["_id"] == $scope.selected) {
							$scope.loading = true;
							console.log("origin balance: " + data[idx]["balance"]);
							console.log("newly amount: " + parseFloat($scope.amount));
							Todos.put($scope.selected, {amount: data[idx]["balance"] + parseFloat($scope.amount)})
							// if successful creation, call our get function to get all the new todos
								.success(function(data) {
									$scope.loading = false;
									$scope.todos = data; // assign our new list of todos
							});
						};
					}
					$scope.amount = '';
				});
		};

		$scope.withdraw = function() {

			alert("Withdraw " + $scope.amount + " yuan");
			
			Todos.get()
				.success(function(data) {
					var msg = JSON.stringify(data);
					console.log(msg);
					
					for(var idx in data) {
						console.log("item id: " + data[idx]["_id"]);
						console.log("selected id: " + $scope.selected);
						if(data[idx]["_id"] == $scope.selected) {
							$scope.loading = true;
							console.log("origin balance: " + data[idx]["balance"]);
							console.log("newly amount: " + parseFloat($scope.amount));
							Todos.put($scope.selected, {amount: data[idx]["balance"] - parseFloat($scope.amount)})
							// if successful creation, call our get function to get all the new todos
								.success(function(data) {
									$scope.loading = false;
									$scope.todos = data; // assign our new list of todos
							});
						};
					}
					$scope.amount = '';
				});

		}*/
	}]);
