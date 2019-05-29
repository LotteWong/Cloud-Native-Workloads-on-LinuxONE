angular.module('customerService', [])

	// super simple service
	// each function returns a promise object
	.factory('Customers', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/customers');
			},
			create : function(customerData) {
				return $http.post('/api/customers', customerData);
			},
			put : function(id, customerData) {
				return $http.put('/api/customers/' + id, customerData);
			},
			delete : function(id) {
				return $http.delete('/api/customers/' + id);
			}
		}
	}]);
