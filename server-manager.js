
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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

app.get('/',           routes.index);
app.get('/index',      routes.index);
app.get('/mandelbrot', routes.mandelbrot);
app.get('/users',      user.list);

var ctrConnection = 0;
var listSockets = [];

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    var d = new Date();
    var mySession = {
	start:     d,
	host:      socket.remoteAddress,
	id:        ctrConnection++,
	ctrButton: 0
    };

    socket.emit('connectionInfo', mySession);

    console.log('new connection: ');
    console.log(mySession);

    listSockets.push(socket);

    socket.emit('news', { hello: 'world ' + mySession.id });

    socket.on('my other event', function (data) {
	console.log(data);
    });

    socket.on('press button', function (data) {
	socket.emit('button tally', {num: mySession.ctrButton});
	mySession.ctrButton++;
    });
});
