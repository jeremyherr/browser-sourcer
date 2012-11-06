var io = require('socket.io-client');

exports.index = function (req, res) {
    res.render('index', { title: 'Home' });
};

exports.admin = function (req, res) {
	var project = require('../project.js');
	p = new project.Project(); // just use constructor defaults for now

	res.render('admin', {
		title: 'Admin',
		projectName:         p.parameters.name,
		projectConstructor:  p.parameters.dataSetConstructor,
		projectXMin:         p.parameters.dataSetParameters.xMin,
		projectXMax:         p.parameters.dataSetParameters.xMax,
		projectXPoints:      p.parameters.dataSetParameters.xPoints,
		projectYMin:         p.parameters.dataSetParameters.yMin,
		projectYMax:         p.parameters.dataSetParameters.yMax,
		projectYPoints:      p.parameters.dataSetParameters.yPoints,
		projectXBlockPoints: p.parameters.dataSetParameters.xBlockPoints,
		projectYBlockPoints: p.parameters.dataSetParameters.yBlockPoints

	});

};

exports.adminPost = function (req, res) {

	var project = require('../project.js');

	p = new project.Project({
		name: req.body['project-name'],
		dataSetConstructor: req.body['project-dataset-constructor'],
		dataSetParameters: {
			xMin:          req.body['project-parameters-xmin'],
			xMax:          req.body['project-parameters-xmax'],
			xPoints:       req.body['project-parameters-xpoints'],
			yMin:          req.body['project-parameters-ymin'],
			yMax:          req.body['project-parameters-ymax'],
			yPoints:       req.body['project-parameters-ypoints'],
			xBlockPoints:  req.body['project-parameters-xblockpoints'],
			yBlockPoints:  req.body['project-parameters-yblockpoints'],
		}
	});

	// open socket to data-server
	var socket = io.connect('http://localhost:3001');
	socket.emit('start project', p);


	res.render('admin', {
		title: 'Admin',
		projectName:         p.parameters.name,
		projectConstructor:  p.parameters.dataSetConstructor,
		projectXMin:         p.parameters.dataSetParameters.xMin,
		projectXMax:         p.parameters.dataSetParameters.xMax,
		projectXPoints:      p.parameters.dataSetParameters.xPoints,
		projectYMin:         p.parameters.dataSetParameters.yMin,
		projectYMax:         p.parameters.dataSetParameters.yMax,
		projectYPoints:      p.parameters.dataSetParameters.yPoints,
		projectXBlockPoints: p.parameters.dataSetParameters.xBlockPoints,
		projectYBlockPoints: p.parameters.dataSetParameters.yBlockPoints

	});

};

exports.mandelbrot = function (req, res) {
	res.render('mandelbrot', { title: 'Mandelbrot Demo'});
};
