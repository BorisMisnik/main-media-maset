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
					templateUrl: 'partials/main.html',
					controller: 'ControllerMain'
			 	}).
			 	when('/about', {
					templateUrl: '/partials/about.html',
					controller: 'ControllerAbout'
			 	}).
			 	when('/service', {
					templateUrl: '/admin/partials/service.html',
					controller: 'ControllerService'
			 	}).
			 	when('/work', {
					templateUrl: '/admin/partials/work.html',
					controller: 'ControllerWork'
			 	}).
			 	when('/contacts', {
					templateUrl: '/admin/partials/contacts.html',
					controller: 'ControllerContacts'
			 	}).
				otherwise({
					redirectTo: '/main'
				});
	}])
	.run(function(){
		var $nav = $('.nav li');

		$nav.on('click', function(){
			var $this = $(this);
			$nav.removeClass('active');
			$this.addClass('active'); // add class active to current link
		});
	});