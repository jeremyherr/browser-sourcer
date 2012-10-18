
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Parallel Browsers' });
};

exports.mandelbrot = function (req, res) {
  res.render('mandelbrot', { title: 'Parallel Browsers - Mandelbrot Demo' });
};
