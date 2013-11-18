var express = require('express')
  , app = express()
  , model = require('./models')
  , upload = require('jquery-file-upload-middleware')
  , fs = require('fs');

// routers
var index = require('./controllers/index')
  , admin = require('./controllers/admin')
  , adminRouters = require('./controllers/adminRouters.js')

// configure Express
app.set('port', process.env.PORT || 5000); 
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static( __dirname + '/public' ));
app.use(express.static( __dirname + '/admin' ));

// connect to mongodb and start server
model.connect(function(){
  //Create the server
	app.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});

app.get('/', index.index);
app.get('/admin', admin.index);
app.get('/admin/login', admin.login);
// main
app.get('/admin/getText', adminRouters.getText); // get text
app.get('/admin/getItems', adminRouters.getItems); // get list items
app.get('/admin/getItem', adminRouters.getItem); // get list items
app.post('/admin/updateItem', adminRouters.updateItem); // get list items

app.post('/admin/saveText', adminRouters.saveText); // save new text
app.post('/admin/saveIteam', adminRouters.saveIteam); // save item
// app.post('/admin/saveWork', adminRouters.saveWork); // save work
app.get('/admin/number', adminRouters.getNumber); 
app.post('/admin/updateNumber', adminRouters.updateNumber); 

app.delete('/admin/removeItem', adminRouters.removeItem) // remove item
app.post('/admin/fileUpload', function(req, res){
 	var name = req.files.fileUpload.name;
	var path = req.files.fileUpload.path;

	fs.readFile(path, function (err, data) {
		if( err ) return res.send({'error': err});
		var newPath = 'public/uploads/' + name;
		fs.writeFile(newPath, data, function (err) {
			if( err ) return res.send({'error':err});
			res.send({path : newPath});
		});
	});
});
