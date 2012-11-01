var common = require('./common.js'),
	data = require('./data-blocks.js');

/**
 * @class Project information for running a whole project, includes default parameters for both DataSet and DataBlock
 *
 */
function Project (options) {
	var defaults = {
		name: 'mandelbrot',
		dataSetConstructor: 'DataSetR2R1',
		dataSetParameters: {
			xMin:          -2,
			xMax:           2,
			xPoints:     1000,
			yMin:          -2,
			yMax:           2,
			yPoints:     1000,
			xBlockPoints: 100,
			yBlockPoints: 100,
		}
	};

	this.parameters = common.extend(options, defaults);

	if (this.parameters.name === 'mandelbrot') {
		// not sure what I want the Project object to do yet, probably gather some sort of statistics.
	}

}


// If running in node.js, export constructor for use by require
if (typeof (exports) === 'object') {
	exports.Project = Project;
}
