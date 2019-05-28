angular.module('financeService', [])

	// super simple service
	// each function returns a promise object
	.factory('Finances', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			put : function(id, todoData) {
				return $http.put('/api/todos/' + id, todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);
