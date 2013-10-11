var collection = require('./index').collection,
	ObjectID = require('mongodb').ObjectID,
	fs = require('fs');

exports.getText = function(name, callback){
	collection = collection || require('./index').collection;
	var query = {};
	query[name] = { $exists: true };
	console.log(query)
	collection.find(query).toArray(function(err, items) {
		if( err ) return console.warn( err );
		console.log(items)
		callback(err, items);
	});
};

exports.saveText = function(name, text, callback){
	var query = {}, obj = {}, set = {};
	query[name] = { $exists: true };
	obj[name] = text;
	set.$set = obj;

	collection = collection || require('./index').collection;
	collection.update(
		 query, set, {},function(err, result) { // result
			if( err )callback(err);
			console.log(result)
	});
};

exports.getItems = function(name, callback){
	var query = {};
	query.type = name;

	collection = collection || require('./index').collection;
	collection.find(query).toArray(function(err, items) {
		if( err ) return console.warn( err );
		callback(err, items);
	});
};

exports.saveIteam = function(query, callback){
	if( !query ) return callback('query is bad', null);

	collection = collection || require('./index').collection;
	collection.insert(query, function(err, result){
		if( err ) return callback( err );
		if( result ) callback(null)
	});
};
exports.updateItem= function(query,set, callback){
	if( !query || !set ) return callback('query is bad', null);

	collection = collection || require('./index').collection;
	collection.update(query, set, function(err, result){
		if( err ) return callback( err );
		if( result ) callback(null)
	});
};
exports.saveImage = function(name, path, callback){
	fs.readFile(path, function (err, data) {
		if( err ) return callback(err, null);
		var newPath = './public/uploads/' + name;

		fs.writeFile(newPath, data, function (err) {
			if( err ) return callback(err, null);
			callback(null, true);
		});
	});
};

exports.removeIteam = function(id, callback){
	if( !id ) return console.log( 'Bad id' );
	collection = collection || require('./index').collection;
	var query = {_id:new ObjectID(id)};
	var unset = {
		$unset : {
			img : '',
			type : ''
		}
	};
	collection.remove(query, true, function(err, result){
		if( err ) return callback( err, null );
		if( result ) callback(null ,result);
	});
};