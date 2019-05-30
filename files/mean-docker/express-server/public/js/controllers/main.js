angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', 'Customers', 'Accounts', 'Transactions', function($scope, $http, Todos, Customers, Accounts, Transactions) {
		$scope.customerData = {}; // 绑定前端的客户数据
		$scope.accountData = {}; // 绑定前端的账户数据
		$scope.transactionData = {}; // 绑定前端的交易记录数据
		$scope.financeData = {
			type: "Yu'E Bao",
			rate: 0.233,
			interest: 0,
			amount: 0,
		}; // 绑定前端的理财产品数据

		$scope.currCustomer = {}; // 绑定数据库的客户数据
		$scope.currAccount = {}; // 绑定数据库的账户数据
		$scope.currTransaction = {}; // 绑定数据库的交易交路数据
		$scope.currFinance = {}; // 绑定数据库的理财产品数据

		$scope.selectedAccount = {}; // 选中的账号

		$scope.operationAmount; // 操作的金额

		$scope.amount;//用于更新balance
		
		var tempAccounts=new Array();
		$scope.newaccount;//用于更新account[]

		$scope.formData = {};
		$scope.loading = true;
		$scope.selected;

		/* 以下是暂时硬编码的数据，可以根据需要修改 */
		$scope.balance;
		$scope.income;
		$scope.outcome;

		Customers.get().success(function(data) {
			console.log("i got the data i requested")
			$scope.todos = data;
			$scope.loading = false;
		});

		$scope.cardId = 100000; // 随机卡号
		
		$scope.isLogin = false;

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
		    $scope.balance = 0;
		    $scope.income = 0;
		    $scope.outcome = 0;
			if ($scope.customerData.username != undefined && $scope.customerData.password != undefined) {
				console.log($scope.customerData.username);
				console.log($scope.customerData.password);

				var dateTime = new Date();
				$scope.customerData.lastSuccessfulLogin = dateTime.toLocaleString();

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

						$scope.isLogin = true;
					
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
			$scope.accounts = {};
			$scope.balance = 0;
			$scope.income = 0;
			$scope.outcome = 0;

			var dateTime = new Date();
			$scope.customerData.lastSuccessfulLogin = dateTime.toLocaleString();
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
					$scope.isLogin = true;

					$scope.currCustomer=$scope.customerData;
					$scope.customerData={};
				}
			})
			
			// 已有账户显示
			Accounts.get()
			.success(function(data) {
				console.log("accounts get");
				var i=0;
				for(var accountx in data){
					console.log("data中的数据"+data[accountx]["customerName"]);
					console.log("currCustomer:"+$scope.currCustomer.username);
					if(data[accountx]["customerName"]==$scope.currCustomer.username)
					{
					    $scope.balance = $scope.balance + data[accountx]["balance"];
					    $scope.income = $scope.income + data[accountx]["income"];
					    $scope.outcome = $scope.outcome + data[accountx]["outcome"];
						console.log("找到账户");
						$scope.accounts[++i]=data[accountx];
						var msg = JSON.stringify($scope.accounts);
						console.log(msg);
					}
				}
				// $scope.accounts = data;
				$scope.loading = false;
			});

			// 已有交易记录显示
			// 仿照上面已有账户显示
			// ......
		};

		$scope.signOut = function() {
			$scope.isLogin = false;
		};


		// 取消转账
		$scope.cancelTransfer = function() {
			// 清空form
		    // ......
		    $scope.transactionData.amount = "";
		    $scope.transactionData.to = "";
		};
		
		//确认转账
		$scope.confirmTransfer = function() {
			// 更新自己的余额和支出
			// ......

			// 更新对方的余额和收入
			// ......

			// 更新自己的交易记录
		    // ......

		    Accounts.get().success(function (data) {
		        console.log("成功获取信息");
		        var msg = JSON.stringify(data);
		        console.log(msg);
		        var flag = 1;

		        // 更新自己的余额和支出
		        // ......

		        for (var accountx in data) {
		            if (data[accountx]["accountId"] == $scope.currAccount.accountId) {
		                console.log("找到对应的账户");
		                console.log($scope.currAccount.accountId);
		                if (data[accountx]["balance"] < parseFloat($scope.transactionData.amount)) {
		                    alert("账户余额不足");
		                    flag = 0;
		                    $scope.transactionData.amount = "";
		                }
		                else {
		                    Accounts.put(data[accountx]["_id"], { balance: data[accountx]["balance"] - parseFloat($scope.transactionData.amount), income: data[accountx]["income"], outcome: data[accountx]["outcome"] + parseFloat($scope.transactionData.amount) })
                          .success(function (data) {
                              var msg = JSON.stringify(data);
                              console.log(msg);
                              $scope.balance = $scope.balance - parseFloat($scope.transactionData.amount);
                              $scope.outcome = $scope.outcome + parseFloat($scope.transactionData.amount);

                              $scope.operationAmount = "";
                              $scope.accounts = data;
                          })
		                }
		            }
		        }
		        // 更新对方的余额和收入
		        // ......
		        if (flag == 1) {
		            for (var accountx in data) {
		                if (data[accountx]["accountId"] == $scope.transactionData.to) {
		                    console.log("找到对方的账户");
		                    //console.log($scope.currAccount.accountId);
		                    Accounts.put(data[accountx]["_id"], { balance: data[accountx]["balance"] + parseFloat($scope.transactionData.amount), income: data[accountx]["income"] + parseFloat($scope.transactionData.amount), outcome: data[accountx]["outcome"] })
		                    success(function (data) {
		                        var msg = JSON.stringify(data);
		                        console.log(msg);
		                    })
		                }
		                else {
		                    console.log("找不到对方的账户");
		                    alert("没有该账户！");
		                }
		            }
		            var dateTime = new Date();
		            $scope.transactionData.account = $scope.currAccount.accountId;
		            $scope.transactionData.operation = 'Transfer';
		            $scope.transactionData.from = $scope.currAccount.accountId;
		            $scope.transactionData.time = dateTime.toLocaleString();
		            // var msg = JSON.stringify($scope.transactionData);
		            //console.log(msg);

		            Transactions.create($scope.transactionData).success(function (data) {
		                //  var msg = JSON.stringify(data);
		                // console.log(msg);

		                $scope.currTransaction = $scope.transactionData;
		                $scope.transactionData = {};
		                $scope.transactions = data;
		            });
		        }

		    })

		};

		// 读取当前账户信息，更新$scope.currAccount
		$scope.selectAccount = function(id) {
			// ......
			Accounts.get().success(function(data){
				for(var idx in data){
					if(data[idx]["_id"]==id){
						console.log("获取到当前账户信息！");
						console.log("matching id:"+data[idx]["_id"]);
						$scope.currAccount=data[idx];
						console.log($scope.currAccount);
					}
				}
			})
		};

		// 随机开户
		$scope.createRandomAccount = function() {
			console.log("it is a new account");
			$scope.accountData.customerName = $scope.currCustomer.username;
			$scope.accountData.accountId = ($scope.cardId++).toString();
			console.log($scope.accountData.accountId);

			Customers.get().success(function(data){
				for(var customerx in data){
					console.log("新建account的账户名为："+data[customerx]["username"]);
					if(data[customerx]["username"]==$scope.currCustomer.username){
						console.log("创建新卡时找到对应账户");
						var length=data[customerx]["accounts"].length;
						console.log("customer的账户有："+length+"个");
						for(var i=0; i<length; ++i){
							tempAccounts[i]=data[customerx]["accounts"][i];
							console.log("customer可以有账户："+tempAccounts[i]);
						}
						tempAccounts[length]=$scope.accountData.accountId;
						Customers.put(data[customerx]["_id"],{newaccount:tempAccounts}).success(function(data){
							var msg=JSON.stringify(data);
							console.log(msg);
						})
					}
				}
			});

			Accounts.create($scope.accountData).success(function(data) {				
				var msg = JSON.stringify(data);
				console.log(msg);

				$scope.loading = false;
				$scope.currAccount = $scope.accountData;
				$scope.accountData = {};
				$scope.accounts = data;
			});

			// 更新当前交易记录的数据库数据
			var dateTime = new Date();
			$scope.transactionData.account = $scope.currAccount.accountId;
			$scope.transactionData.operation = 'Create';
			$scope.transactionData.from = $scope.currCustomer.username;
			$scope.transactionData.to = $scope.currCustomer.username;
			$scope.transactionData.time = dateTime.toLocaleString();

			var msg = JSON.stringify($scope.transactionData);
			console.log(msg);

			Transactions.create($scope.transactionData).success(function(data) {
				var msg = JSON.stringify(data);
				console.log(msg);

				$scope.currTransaction = $scope.transactionData;
				$scope.transactionData = {};
				$scope.transactions = data;
			});

			// 更新当前客户的数据库账户数据
		};

		// 存款
		$scope.deposit = function() {
			// 注意更新交易记录
			// ......
			Accounts.get().success(function(data){
				console.log("成功获取信息");
				var msg=JSON.stringify(data);
				console.log(msg);
				for(var accountx in data){
					if(data[accountx]["accountId"]==$scope.currAccount.accountId){
						console.log("找到对应的账户");
						console.log($scope.currAccount.accountId);
						Accounts.put(data[accountx]["_id"], { balance: data[accountx]["balance"] + parseFloat($scope.operationAmount), income: data[accountx]["income"] + parseFloat($scope.operationAmount), outcome: data[accountx]["outcome"] })
                           .success(function (data) {
                               var msg = JSON.stringify(data);
                               console.log(msg);
                               $scope.balance = $scope.balance + parseFloat($scope.operationAmount);
                               $scope.income = $scope.income + parseFloat($scope.operationAmount);

                               $scope.operationAmount = "";
                               $scope.accounts = data;
                           })
					}
				}
			})

			// 更新当前交易记录的数据库数据
			// ......
		};

		// 取款
		$scope.withdraw = function() {
			// 注意更新交易记录
			// 注意不够钱取款的错误处理
			// ......
			Accounts.get().success(function(data){
				console.log("成功获取信息");
				var msg=JSON.stringify(data);
				console.log(msg);
				for(var accountx in data){
					if(data[accountx]["accountId"]==$scope.currAccount.accountId){
						console.log("找到对应的账户");
						console.log($scope.currAccount.accountId);
						if(data[accountx]["balance"]<parseFloat($scope.operationAmount)){
							alert("账户余额不足");
							$scope.operationAmount="";
						}
						else{
						    Accounts.put(data[accountx]["_id"], { balance: data[accountx]["balance"] - parseFloat($scope.operationAmount), income: data[accountx]["income"], outcome: data[accountx]["outcome"] + parseFloat($scope.operationAmount) }).success(function (data) {
						        var msg = JSON.stringify(data);
						        console.log(msg);
						        $scope.balance = $scope.balance - parseFloat($scope.operationAmount);
						        $scope.outcome = $scope.outcome + parseFloat($scope.operationAmount);
						        $scope.operationAmount = "";
						        $scope.accounts = data;
						    })
						}
					}
				}
			})

			// 更新当前交易记录的数据库数据
			// ......
		};

		// 购买理财产品的预计收益
		// 公式 = 持有月数 / 12 * 年利率
		$scope.purchaseFinanceProduct = function(month) {

		};

}]);
