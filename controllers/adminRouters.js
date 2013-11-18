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
	query.language = req.body.language || req.body.languageChange;

	var set = {};
	set[name] = req.body.text
	set.language = req.body.language || req.body.languageChange;

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
	console.log(req.query.id)
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
		var url = '';
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
				url = '/admin#service';
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
				url = '/admin#about';
			} 
			else if( req.body.category === 'socialButton' ){ // fotter buttons
				query = {
					type:'socialButton', 
					link : req.body.link, 
					img : img, 
					index: index,
					language : language
				};
				url = '/admin#contacts';
			}
			else if( req.body.category === 'work' ){
				console.log(req.body.lognDescription)
				query = {
					type:'work', 
					img : img,  
					index:index,
					language : language,
					title : req.body.title,
					description : req.body.lognDescription,
					id_video : req.body.id_video
				}
				url = '/admin#work';
			}
			else {
				query = {
					type:'clients', 
					img : img,  
					index:index}; // client
				url = '/admin#main';
			}

			model.saveIteam(query, function(err, result){
				if( err ) return console.log( err );
				req.session.update = true;
				res.redirect(url);
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
	var url = '';
	if( req.body.type === 'workers' ){
		set = {
			type:'workers', 
			name : req.body.name, 
			job: req.body.job,
			index: req.body.index,
			language : req.body.language
		}
		url = '/admin#about';
	}
	else if( req.body.type === 'service' ){
		set = {
			type:'service', 
			title : req.body.title, 
			index: req.body.index,
			description: req.body.description,
			language : req.body.language
		}
		url = '/admin#service';
	}
	else if ( req.body.type === 'socialButton' ){
		set = {
			type:'socialButton',
			index: req.body.index,
			link: req.body.link
		}
		url = '/admin#contacts';
	} 
	else if ( req.body.type === 'work' ){
		set = {
			type:'work', 
			index: req.body.index,
			language : req.body.language,
			title : req.body.title,
			description : req.body.lognDescription,
			id_video : req.body.id_video
		}
		url = '/admin#work';
	}
	if( name !== '' && path !== '' ){
		model.saveImage(name, path, function(err, result){
			if( err ) return console.log( err );
			var img = '/uploads/' + name;
			set.img = img;
			model.updateItem(query, set, function(err, result){
				if( err ) return console.log( err );
				req.session.update = true;
				res.redirect(url);
			});
		});
	}
	else {
		model.updateItem(query, set, function(err, result){
			if( err ) return console.log( err );
			req.session.update = true;
			res.redirect(url);
		});
	}
};

// delete */removeItem/:id*
exports.removeItem = function(req, res){
	model.removeIteam(req.query.id, function(err, result){
		if( err ) return console.log( err );
		if(!err && result) res.send({result : 'ok'});
 	});
};

exports.getNumber = function(req, res){
	model.getNumber(function(err, result){
		res.send(result[0]);
	});
};

exports.updateNumber = function(req, res){
	model.updateNumber(req.body.number, function(){
		res.send('ok');
	});
};