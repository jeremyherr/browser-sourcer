var common = require('./common.js'),
	util   = require('util');

var idCtr = new IDCtr();

/**
 * @class global counter for assigning unique IDs to every block.
 */
function IDCtr() {
	"use strict";

	var ctr = 0;

	/**
	 * simply increment and return counter
	 */
	this.getId = function () {
		ctr += 1;
		return ctr;
	};
}

/**
 * @class data block for holding a regular grid of points, with domain 2D real and range 1D real
 * @param {Object} an object containing xMin, xMax, xStep, yMin, yMax, yStep
 */
function DataBlockR2R1(options) {
	"use strict";

	var xCtr,
		yCtr,
		k,
		defaults = {
			xMin:     0,
			xMax:     1,
			xPoints: 10,
			yMin:     0,
			yMax:     1,
			yPoints:  10
		};

	this.parameters = common.extend(options, defaults);

	// total number of iterations through calculation loop for all points in block.
	this.numCalculations = 0;

	// unique ID for this block, so that server-manager can tell worker node which block to request
	this.ID = '';

	// key passed to worker node, giving it permission to calculate data for this block.
	// This key will be reset every time it is assigned to a new worker node.
	this.processingID = '';

	/**
	 * Create 2-dimensional array full of zeros. The zeros are to be replaced with 1-dimensional output later.
	 */
	this.generateDomain = function () {
		this.data = [];

		for (xCtr = 0; xCtr < this.parameters.xPoints; xCtr++) {
			this.data[xCtr] = [];
			for (yCtr = 0; yCtr < this.parameters.yPoints; yCtr++) {
				this.data[xCtr][yCtr] = 0;
			}
		}
	};

	/**
	 * Generate a unique key for the processing of this block of data.
	 */
	this.generateProcessingID = function () {
		var d = new Date();
		// pad with zeros to get two 16-digit numbers, first is num seconds since epoch, second is random
		this.processingID = ('0000000000000000' + d.getTime()).slice(-16) + '_' + ('0000000000000000' + Math.floor(Math.random() * 1e+15)).slice(-16);
	};

	/**
	 * Create data object for conversion to JSON
	 */
	this.toJSON = function () {
		return ({
			'parameters':      this.parameters,
			'data':            this.data,
			'processingID':    this.processingID,
			'numCalculations': this.numCalculations
		});
	};

}

/**
 * @class the whole set of data to be calculated
 *
 *
 */
function DataSetR2R1(options) {
	"use strict";

	var k,
		defaults = {
			xMin:          -2,
			xMax:           2,
			xPoints:     1000,
			yMin:          -2,
			yMax:           2,
			yPoints:     1000,
			xBlockPoints: 100,
			yBlockPoints: 100,
		};

	this.parameters = common.extend(options, defaults);

	/**
	 * Partition up the data set into a grid of block objects and store them in a 2-dimensional array this.jobGrid.
	 */
	this.generateJobGrid = function () {
		var xCtr,
			yCtr,
			i,
			j,
			block,
			p = this.parameters;

		this.jobGrid = [];

		for (xCtr = 0, i = 0; xCtr < p.xPoints; xCtr += p.xBlockPoints, i++) {
			this.jobGrid[i] = [];
			for (yCtr = 0, j = 0; yCtr < p.yPoints; yCtr += p.yBlockPoints, j++) {
				block = new DataBlockR2R1({
					xMin:    p.xMin + ((p.xMax - p.xMin) / p.xPoints) * xCtr,
					xMax:    p.xMin + ((p.xMax - p.xMin) / p.xPoints) * (xCtr + 1),
					xPoints: p.xBlockPoints,
					yMin:    p.yMin + ((p.yMax - p.yMin) / p.yPoints) * yCtr,
					yMax:    p.yMin + ((p.yMax - p.yMin) / p.yPoints) * (yCtr + 1),
					yPoints: p.yBlockPoints
				});

				block.ID = idCtr.getId();

				this.jobGrid[i][j] = block;
			}
		}
	};

	/**
	 * Order the grid of blocks into a 1-dimensional array. Jobs will be handed off to worker nodes in this order.
	 */
	this.generateJobList = function () {
		var i,
			j;

		this.jobList = [];

		// boring line by line method
		// TODO: spiral outwards, scattering as you go
    	for (i = 0; i < this.jobGrid.length; i++) {
    	    for (j = 0; j < this.jobGrid[i].length; j++) {
    	    	this.jobList.push(this.jobGrid[i][j].ID);
    	    }
    	}

	};

	// copied this from mandelbrot.js, needs work
    this.orderJobs = function () {
    	var i, j;

    	var flagBlock = [];
    	for (i = 0; i < this.blockArray.length; i++) {
    	    flagBlock[i] = [];
    	    for (j = 0; j < this.blockArray[i].length; j++) {
    		flagBlock[i][j] = 0;
    	    }
    	}

    	console.log('flagBlock');
    	console.log(flagBlock);

    	var rLimit = 1, r, theta, x, y;

    	console.log('sumArray(this.blockArray):');
    	console.log(sumArray(flagBlock));
    	console.log('size of blockArray:');
    	console.log(this.blockArray.length * this.blockArray[0].length);

    	while (sumArray(flagBlock) < this.blockArray.length * this.blockArray[0].length) {
    	    r     = Math.random() * rLimit;
    	    theta = Math.random() * (Math.PI / 2);
    	    x     = Math.floor(r * Math.cos(theta));
    	    y     = Math.floor(r * Math.sin(theta));

    	    rLimit += 0.01;

    	    if (x < this.blockArray.length && y < this.blockArray[0].length && ! flagBlock[x][y]) {
    			flagBlock[x][y] = 1;
    			this.jobList.push(this.blockArray[x][y]);
    	    }

    	}


    };


	/**
	 *
	 */
    this.getNumPoints = function () {

    };

	/**
	 *
	 */
    this.getNumBlocks = function () {

    };

	/**
	 * Get the total number of calculations in all blocks
	 */
    this.getNumCalculations = function () {

    };

}

//If running in node.js, export constructor for use by require
if (typeof (exports) === 'object') {
	exports.DataBlockR2R1 = DataBlockR2R1;
	exports.DataSetR2R1   = DataSetR2R1;
}
