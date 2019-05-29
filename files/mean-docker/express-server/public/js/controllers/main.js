angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', 'Customers', 'Accounts', function($scope, $http, Todos, Customers, Accounts) {
	// .controller('mainController', ['$scope','$http', 'Customers', function($scope, $http, Customers) {	
	// .controller('mainController', ['$scope','$http', 'Todos', function($scope, $http, Todos) {	
		$scope.customerData = {}; // 绑定前端的客户数据
		$scope.accountData = {}; // 绑定前端的账户数据

		$scope.currCustomer = {}; // 绑定数据库的客户数据
		$scope.currAccount = {}; // 绑定数据库的账户数据
		
		$scope.transAccount; // 转账的账号
		$scope.transAmount; // 转账的金额

		$scope.selectedAccount = {}; // 选中的账号

		$scope.operationAmount; // 操作的金额

		$scope.formData = {};
		$scope.loading = true;
		$scope.selected;

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
		/*$scope.account = {

		}

		 */
		/*$scope.transaction = {
			type: "Transfer",
			from: "Charlotte",
			to: "Greta",
			amount: "1024",
			time: "20190528"
		};*/
		$scope.finance = {
			type: "Yu'E Bao",
			rate: "2.33%",
			interest: "6.66",
		};

		Customers.get().success(function(data) {
			console.log("i got the data i requested")
			$scope.todos = data;
			$scope.loading = false;
		});

		// 读取当前客户信息，更新$scope.currCustomer
		// ......

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

				var msg = JSON.stringify($scope.customerData);
				console.log(msg);

				Customers.get().success(function(data){
					console.log("获取到data");
					for(var usernamex in data){
						if(data[usernamex]["username"]==$scope.customerData.username){
							console.log("重复名字");
							alert("username is already existed");
							$scope.customerData={};
						}
					}
					if($scope.customerData.username!=null)
				{
					console.log("customerData的值不为空");
					Customers.create($scope.customerData).success(function(data) {
						var msg = JSON.stringify(data);
						console.log(msg);
					
						$scope.currCustomer = $scope.customerData;
						$scope.customerData = {};
						$scope.customers = data;
					});
				}
				})
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
			var userexist=false;
			var pwdcorrect=true;
			Customers.get().success(function(data){
				console.log("获取到data");
				for(var usernamex in data){
					if(data[usernamex]["username"]==$scope.customerData.username){
						console.log("找到名字");
						userexist=true;
						if(data[usernamex]["password"]!=$scope.customerData.password){
							alert("密码错误！");
							pwdcorrect=false;
							$scope.customerData={};
						}
					}
				}
				if(userexist==false){
					alert("customer does not exist!");
					$scope.customerData={};
				}
				if(userexist==true&&pwdcorrect==true){
	
				}
			})
			
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
			console.log("id");
			Accounts.get().success(function(data){
				for(var idx in data){
					if(data[idx]["_id"]==id){
						console.log("获取到当前账户信息！");
						$scope.currAccount=data[idx];
					}
				}
			})
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
			if ($scope.accountData.accountName != undefined) {
				console.log($scope.accountData.accountName);

				$scope.loading = true;

				Accounts.get().success(function(data){
					for(var accountnamex in data){
						if(data[accountnamex]["accountName"]==$scope.accountData.accountName){
							// alert("account is already existed!");
							console.log("account is already existed");
							$scope.accountData={};
							$scope.loading=false;							
						}
					}

					if($scope.accountData.accountName!=null){
						console.log("it is a new account");
						$scope.accountData.customerName = $scope.currCustomer.username;
	
						console.log($scope.accountData.customerName);
	
						var msg = JSON.stringify($scope.accountData);
						console.log(msg);
	
						Accounts.create($scope.accountData).success(function(data) {
							var msg = JSON.stringify(data);
							console.log(msg);
						
							$scope.loading = false;
							$scope.currAccount = $scope.accountData;
							$scope.accountData = {};
							$scope.accounts = data;
							// 更新当前客户的数据库账户数据
	
						});
					}
				})			
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
