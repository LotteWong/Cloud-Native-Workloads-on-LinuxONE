angular.module('transactionService', [])

	// super simple service
	// each function returns a promise object
	.factory('Transactions', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/transactions');
			},
			create : function(transactionData) {
				return $http.post('/api/transactions', transactionData);
			},
			put : function(id, transactionData) {
				return $http.put('/api/transactions/' + id, transactionData);
			},
			delete : function(id) {
				return $http.delete('/api/transactions/' + id);
			}
		}
	}]);
