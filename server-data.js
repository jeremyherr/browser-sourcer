/**
 * Module dependencies.
 *
 */

var express = require('express'),
    routes  = require('./routes'),
    http    = require('http'),
    path    = require('path'),
    data    = require('./data-blocks.js');

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

var d = new data.DataSetR2R1 ({
	xMin:          -2,
	xMax:           2,
	xPoints:       10,
	yMin:          -2,
	yMax:           2,
	yPoints:       10,
	xBlockPoints:   2,
	yBlockPoints:   2
});

d.generateJobGrid();

d.generateJobList();

var ctrConnection = 0;
var listSockets = [];

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Data server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    console.log('new connection');

    socket.emit('status', { status: 'ready' });

    // need to make sure this command comes from an authorized server
    socket.on('start project', function (data) {
    	console.log('received command: start project');
    	console.log(data);
    });

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
