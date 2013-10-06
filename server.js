var express = require('express')
  , app = express();

// routers
var index = require('./controllers/index')
  // , admin = require('./controllers/admin');

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
// model.connect(function(){
//   //Create the server
  
// });
app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
app.get('/', index.index);
// app.get('/admin', admin.index);
// app.get('/admin/login', admin.login);
// app.get('/admin/edit', admin.getAll);
// app.delete('/admin/edit', admin.remove);

