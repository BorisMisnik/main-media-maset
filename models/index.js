var mongodb = require('mongodb'),
	json = require('../collection.json');

exports.connect = function(callback){
	var mongoUri = process.env.MONGOLAB_URI ||
				   process.env.MONGOHQ_URL ||
				   'mongodb://localhost/test';

	mongodb.Db.connect(mongoUri, function (err, db) {
		if( err ) return console.warn('Dosent connect to DB');
		db.collection('admin', function(err, collection) {
			console.log('mongodb connect to ' + mongoUri);
			if( err ) return console.warn('Dosent connect to collection admin');
			collection.count(function(err, count){
				if( err ) throw err;
				if( count === 0 ){ // if collection dosynt crate

					collection.insert(json, function(err, result){ // insert fileds
						if ( err ) return console.warn( err );
						exports.collection = collection; // export collection
						console.log('collection name admin');
						callback(); // run server	
					});

				} else {
					exports.collection = collection; // export collection
					console.log('collection name admin');
					callback(); // run server	
				}
			})

		});
	});
};
