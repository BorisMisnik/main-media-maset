var model = require('../models/main')
  , async = require('async');

exports.index = function(req, res){

	if( !req.query.hasOwnProperty('lang') ) res.redirect('/?lang=en');
	if( req.query.lang !== 'ru' && req.query.lang !== 'en' ) return res.redirect('/?lang=en')

	var lang = req.query.lang;
	var page = {};

	var titles = [];
	if( lang === 'ru' )
		titles = ['О нас', 'Сервисы', 'Работы', 'Контакты', 'Читать дальше'];
	else
		titles = ['About', 'Service', 'Works', 'Contacts', 'Read more'];

	page.lang = lang;
	page.titles = titles;
	async.parallel([
		function (callback){ // get title main
			var query = {};
			query['mainText'] = {$exists : true};
			query.language = lang;
			model.getText(query, function(err, result){
				if( err ) return callback(err, null);
				page.mainText = result[0].mainText;
				callback(null);
			});
		},
		function (callback){  // get clients
			model.getItems('clients', function(err, result){
				if( err ) return callback(err, null);
				page.clients = result;
				callback(null);
			});
		},
		function (callback){ // get about text
			var query = {};
			query['aboutText'] = {$exists : true};
			query.language = lang;
			model.getText(query, function(err, result){
				if( err ) return callback(err, null);
				page.aboutText = result[0].aboutText;
				callback(null);
			});
		},
		function (callback){ // get list  workers
			model.getItems('workers', function(err, result){
				if( err ) return callback(err, null);
				page.workers = result;
				callback(null);
			}, lang);
		},
		function (callback){ // get service text
			var query = {};
			query['serviceText'] = {$exists : true};
			query.language = lang;
			model.getText(query, function(err, result){
				if( err ) return callback(err, null);
				page.serviceText = result[0].serviceText;
				callback(null);
			});
		},
		function (callback){ //get services list
			model.getItems('service', function(err, result){
				if( err ) return callback(err, null);
				var i = 0,
					max = result.length;
				for (; i<max; i++) {
					if( result[i].name === 'D3' ){
						result[i].name = '3D';
						result[i].className = 's-3d';
					} else 
						result[i].className = result[i].name;

					if( result[i].visible )
						result[i] = null;
						
				};
				page.services = result;
				callback(null);
			}, lang);
		},
		function (callback){ //get works list
			model.getItems('work', function(err, result){
				if( err ) return callback(err, null);
				page.works = result;
				callback(null);
			}, lang);
		},
		function (callback){ // get  contacts Text
			var query = {};
			query['contactsText'] = {$exists : true};
			query.language = lang;
			model.getText(query, function(err, result){
				if( err ) return callback(err, null);
				page.contactsText = result[0].contactsText;
				callback(null);
			});
		},
		function (callback){ // get links
			model.getItems('socialButton', function(err, result){
				if( err ) return callback(err, null);
				page.links = result;
				callback(null);
			});
		}
	], function(err, callback){
		console.log(page)
		if( err ) return res.send(404);
		res.render('index',page);
	});

	
}