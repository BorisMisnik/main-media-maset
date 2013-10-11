var model = require('../models/main')
	, fs = require('fs');

// post */mainAbout/*
exports.getText = function(req, res){
	model.getText(req.query.name, function(err, result){
		if( err ) return res.send({error : err});
		res.send({data : result});
	});
};
// post */mainAbout/*
exports.saveText = function(req, res){
	var text = req.body.text;
	var name = 	req.body.name;
	model.saveText(req.body.name, text, function(err){
		if( err ) return res.send({error : err});
		res.send({data : true});
	});
};

// post */getList/*
exports.getItems = function(req, res){
	model.getItems(req.query.name, function(err, result){
		if( err ) return res.send({error : err});
		console.log(result)
		res.send({data : result});
	});
}
// post */addClient/*
exports.saveIteam = function(req, res){
	console.log(req.body)
	if( req.files ){
		var name = req.files.image.name;
		var path = req.files.image.path;
		var query = {};
		model.saveImage(name, path, function(err, result){
			if( err ) return console.log( err );
			var img = '/uploads/' + name;
			if( req.body.name && req.body.job ){ // worker
				query = {type:'workers', name : req.body.name, job: req.body.job, img : img};
			} 
			else {
				query = {type:'clients', img : img};
			}
			model.saveIteam(query, function(err, result){
				if( err ) return console.log( err );
				res.redirect('/admin');
			});
		});
	} else if( req.body.category ){
		if( req.body.category === 'service' ){ // save service item
			var query = {};
			query.type = 'service';
			query.name = req.body.name;
			var set = {};
			set.text = req.body.text;
			set.visible = req.body.visible;
			model.updateItem(query, set, function(err, result){
				if( err ) return console.log( err );
				res.send({succsess : 'ok'});
			});
		}
	}
};

// delete */removeItem/:id*
exports.removeItem = function(req, res){
	model.removeIteam(req.query.id, function(err, result){
		if( err ) return console.log( err );
		if(!err && result) res.send({result : 'ok'});
 	});
}