var express = require('express')
  , app = express()
  , model = require('./models');

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

app.post('/admin/saveText', adminRouters.saveText); // save new text
app.post('/admin/saveIteam', adminRouters.saveIteam); // save item

app.delete('/admin/removeItem', adminRouters.removeItem) // remove item

// app.get('/admin/edit', admin.getAll);
// app.delete('/admin/edit', admin.remove);

