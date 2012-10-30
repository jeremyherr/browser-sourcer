exports.index = function (req, res) {
    res.render('index', { title: 'Home' });
};

exports.admin = function (req, res) {
	res.render('admin', { title: 'Admin' });
};

exports.mandelbrot = function (req, res) {
	res.render('mandelbrot', { title: 'Mandelbrot Demo' });
};