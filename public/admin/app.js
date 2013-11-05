/**
*  Module
*
* Description
*/
angular
	.module('admin', ['adminServices'])
	.config(['$routeProvider',
	 	function($routeProvider) {
			$routeProvider.
				when('/main', {
					templateUrl: 'admin/partials/main.html',
					controller: 'ControllerMain'
			 	}).
			 	when('/about', {
					templateUrl: 'admin/partials/about.html',
					controller: 'ControllerAbout'
			 	}).
			 	when('/service', {
					templateUrl: 'admin/partials/service.html',
					controller: 'ControllerService'
			 	}).
			 	when('/work', {
					templateUrl: 'admin/partials/work.html',
					controller: 'ControllerWork'
			 	}).
			 	when('/work/:id', {
					templateUrl: 'admin/partials/work-edit.html',
					controller: 'ControllerWorkEdit'
			 	}).
			 	when('/contacts', {
					templateUrl: 'admin/partials/contacts.html',
					controller: 'ControllerContacts'
			 	}).
				otherwise({
					redirectTo: '/main'
				});
	}]);