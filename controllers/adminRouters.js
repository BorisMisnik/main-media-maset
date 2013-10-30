var model = require('../models/main')
	, async = require('async')
	, fs = require('fs')
	, ObjectID = require('mongodb').ObjectID;

// post */mainAbout/*
exports.getText = function(req, res){
	var name = req.query.name;
	var language = req.query.language;
	var query = {};
	query[name] = { $exists: true };
	query.language = language;
	console.log(query)
	model.getText(query, function(err, result){
		if( err ) return res.send({error : err});
		res.send({data : result});
	});
};
// post */mainAbout/*
exports.saveText = function(req, res){
	var text = req.body.text;
	var name = 	req.body.name;
	var query = {};
	query[name] = { $exists: true };
	query.language = req.body.language;

	var set = {};
	set[name] = req.body.text
	set.language = req.body.language;

	model.saveText(query, set, function(err){
		if( err ) return res.send({error : err});
		res.send({data : true});
	});
};

// post */getList/*
exports.getItems = function(req, res){
	model.getItems(req.query.name, function(err, result){
		if( err ) return res.send({error : err});
		res.send({data : result});
	});
}
// get  */getItem/*
exports.getItem = function(req, res){
	model.getItem(req.query.id, function(err, result){
		if( err ) return res.send(404);
		res.send(result[0]);
	});
}
// post */addClient/*
exports.saveIteam = function(req, res){
	if( req.files ){
		var name = req.files.image.name;
		var path = req.files.image.path;
		var index = req.body.index;
		var language = req.body.language;
		var query = {};

		model.saveImage(name, path, function(err, result){
			if( err ) return console.log( err );
			var img = '/uploads/' + name;
			if( req.body.category === 'service' ){ // save service item
				query = {
					type : 'service',
					title : req.body.title,
					index : req.body.index,
					img : img,
					description : req.body.description,
					language : language
				}
			}
			else if ( req.body.name && req.body.job ){ // worker
				query = {
					type:'workers', 
					name : req.body.name, 
					job: req.body.job, 
					img : img, 
					index:index,
					language : language
				};
			} 
			else if( req.body.category === 'socialButton' ){ // fotter buttons
				query = {
					type:'socialButton', 
					link : req.body.link, 
					img : img, 
					index: index,
					language : language
				};
			}
			else {
				query = {
					type:'clients', 
					img : img,  
					index:index}; // client
			}

			model.saveIteam(query, function(err, result){
				if( err ) return console.log( err );
				res.redirect('/admin');
			});
		});
	} else if( req.body.category ){
		
	}
};
// post */apdateItem/*
exports.updateItem = function(req, res){
	var name = req.files.image.name;
	var path = req.files.image.path;
	var set = {};
	var query = {_id : new ObjectID(req.body._id)};

	if( req.body.type === 'workers' ){
		set = {
			type:'workers', 
			name : req.body.name, 
			job: req.body.job,
			index: req.body.index,
			language : req.body.language
		}
	}
	else if( req.body.type === 'service' ){
		set = {
			type:'service', 
			title : req.body.title, 
			index: req.body.index,
			description: req.body.description,
			language : req.body.language
		}
	}
	else if ( req.body.type === 'socialButton' ){
		set = {
			type:'socialButton',
			index: req.body.index,
			link: req.body.link
		}
	} 
	if( name !== '' && path !== '' ){
		model.saveImage(name, path, function(err, result){
			if( err ) return console.log( err );
			var img = '/uploads/' + name;
			set.img = img;
			model.updateItem(query, set, function(err, result){
				if( err ) return console.log( err );
				res.redirect('/admin');
			});
		});
	}
	else {
		model.updateItem(query, set, function(err, result){
			if( err ) return console.log( err );
			res.redirect('/admin');
		});
	}
};
// post */save work update work
exports.saveWork = function(req, res){
					console.log('save work')

	async.series([
		function(callback){ //save prewie
			if( req.files.previewimage.size === 0 ){
				return callback(null, '');
			}
			var name = req.files.previewimage.name;
			var path = req.files.previewimage.path;
			model.saveImage(name, path, function(err, result){
				if( err ) return callback(err, null);
				var img = '/uploads/' + name;
				callback(null, img);
			});
		},
		function(callback){ //save content file
			if( req.files.file.name === '' ||  req.files.file.size === 0)
				return callback(null, '');
			var name = req.files.file.name;
			var path = req.files.file.path;

			model.saveImage(name, path, function(err, result){
				if( err ) return callback(err, null);
				var img = '/uploads/' + name;
				callback(null, img);
			});
		}
	], function(err, result){
		var query = {};
		query.title = req.body.title;
		query.index = req.body.index;
		query.description = req.body.lognDescription;
		query.typeContent = req.body.typeContent;
		query.type = 'work';
		if( result[0] !== '' )
			query.prewie = result[0];
		if( result[1] !== '' )
			query.file = result[1];

		query.typeContent = req.body.is_video === '' ? 'file' : 'video';
		query.id_video = req.body.id_video;

		if( req.body._id ){
			var find = {
				_id : new ObjectID(req.body._id)
			};

			model.updateItem(find, query, function(err, result){
				if( err ) return console.log( err );
				res.redirect('/admin');
			});
		}
		else{
			model.saveIteam(query, function(err, result){
				if( err ) return console.log( err );
				res.redirect('/admin');
			});
		}
	});
};

// delete */removeItem/:id*
exports.removeItem = function(req, res){
	model.removeIteam(req.query.id, function(err, result){
		if( err ) return console.log( err );
		if(!err && result) res.send({result : 'ok'});
 	});
};