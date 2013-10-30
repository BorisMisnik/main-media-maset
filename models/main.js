var collection = require('./index').collection,
	ObjectID = require('mongodb').ObjectID,
	fs = require('fs');

exports.getText = function(query, callback){
	collection = collection || require('./index').collection;
	console.log(query)
	collection.find(query).toArray(function(err, items) {
		if( err ) return console.warn( err );
		callback(err, items);
	});
};

exports.saveText = function(query, set, callback){
	collection = collection || require('./index').collection;
	collection.update(
		 query, set, {},function(err, result) { // result
			if( err )callback(err);
	});
};

exports.getItems = function(name, callback, lng){
	var query = {};
	query.type = name;
	if( lng )
		query.language = lng
	console.log(query)
	collection = collection || require('./index').collection;
	collection.find(query).sort({index : 1}).toArray(function(err, items) {
		if( err ) return console.warn( err );
		callback(err, items);
	});
};
exports.getItem = function(id, callback){
	var query = {_id:new ObjectID(id)};
	collection = collection || require('./index').collection;
	collection.find(query).toArray(function(err, items) {
		if( err ) return console.warn( err );
		callback(err, items);
	});
}
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
	collection.update(query, {$set:set},{},function(err, result){
		if( err ) return callback( err );
		if( result ) callback(null);
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