angular.module('adminServices', ['ngResource']).
	factory('Text', function($resource){
		return $resource('admin/:type', {type : '@type'}, {
			query: {method:'GET'}, //get text
			save : {method:'POST'} // save text
	  	});
	}).
	factory('Items', function($resource){
		return $resource('admin/:type', {type : '@type'}, {
			query: {method:'GET', params:{name:'@name'}, isArray:false}, //get item
			delete: {method:'DELETE', params:{id:'@id'}},//remove item
			save : {method:'POST', isArray:false}, // save item
			update : {metohd:'POST'}, // update item
			getItem : {metohd:'GET'} // get items
	  	});
	})
