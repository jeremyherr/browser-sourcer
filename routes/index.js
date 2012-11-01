exports.index = function (req, res) {
    res.render('index', { title: 'Home' });
};

exports.admin = function (req, res) {
	var project = require('../project.js');
	p = new project.Project(); // just use constructor defaults for now

	res.render('admin', {
		title: 'Admin',
		project: JSON.stringify(p)
	});

};

exports.mandelbrot = function (req, res) {
	res.render('mandelbrot', { title: 'Mandelbrot Demo'});
};