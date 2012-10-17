/**
 * Module dependencies.
 *
 */

var express = require('express'), 
    routes  = require('./routes'),
    user    = require('./routes/user'),
    http    = require('http'),
    path    = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.locals.pretty = true;
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/data', routes.data);

var ctrConnection = 0;
var listSockets = [];

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Data server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    console.log('new connection');

    socket.emit('status', { status: 'ready' });

    socket.on('request data', function (data) {
	console.log('request for data');
	console.log(data);

	socket.emit('data', {data: 'data'});
    });

    socket.on('submit result', function (data) {
	console.log('result received');
	console.log(data);

	socket.emit('result received', {'result': received});
    });
});
