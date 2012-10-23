var common = require('./common.js');

/**
 * @class data block for holding a regular grid of points, with domain 2D real and range 1D real
 * @param {Object} an object containing xMin, xMax, xStep, yMin, yMax, yStep
 */
function DataBlock2R1R(options) {
	"use strict";

	var xCtr,
		yCtr,
		k,
		defaults = {
			xMin:   0,
			xMax:   1,
			xStep: 10,
			yMin:   0,
			yMax:   1,
			yStep: 10
		};

	this.parameters = common.extend(options, defaults);

	/**
	 * Create 2-dimensional array full of zeros. The zeros are to be replaced with 1-dimensional output later.
	 */
	this.generateDomain = function () {
		this.data = [];

		for (xCtr = 0; xCtr < this.parameters.xStep; xCtr++) {
			this.data[xCtr] = [];
			for (yCtr = 0; yCtr < this.parameters.yStep; yCtr++) {
				this.data[xCtr][yCtr] = 0;
			}
		}
	};

	/**
	 * Create data object for conversion to JSON
	 */
	this.toJSON = function () {
		return ({
			'parameters': this.parameters,
			'data':       this.data
		});
	};

}

// If running in node.js, export constructor for use by require
if (typeof (exports) === 'object') {
	exports.DataBlock2R1R = DataBlock2R1R;
}
