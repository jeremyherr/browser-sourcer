/**
 * calculates sum of all elements in 2-dimensional array
 * @param {Array} arr a 2-dimensional array
 * 
 */
function sumArray (arr) {

    var i, j, total = 0;

    for (i = 0; i < arr.length; i++) {
	for (j = 0; j < arr[0].length; j++) {
	    total += arr[i][j];
	}
    }

    return total;
}

/**
 * @class Represents one block of pixels to be calculated.
 * 
 */
exports.GraphBlock = function () {
    "use strict";
    
    this.pixel = {'xMin': 0, 'xMax': 0, 'yMin': 0, 'yMax': 0};
    this.point = {'xMin': 0, 'xMax': 0, 'yMin': 0, 'yMax': 0};

}

/**
 * @class Code to be run on server
 * 
 */
function Server (options) {
    "use strict";
    var settings = {};
    this.blockArray = [];
    this.jobList    = [];

    settings.pixelWidth  = 1200;
    settings.pixelHeight =  900; 
    settings.blockWidth  =  50;
    settings.blockHeight =  50;
    settings.graphDim    = {xMin: -1.05, xMax: -0.85, yMin: 0.4, yMax: 0.2};

    this.partitionCanvas = function () {
	var pixel = {},
	block,
	i, j;
	
	console.log('in this.partitionCanvas');

	for (pixel.x = 0, i = 0; pixel.x < settings.pixelWidth; pixel.x += settings.blockWidth, i++) {
	    this.blockArray[i] = [];
	    for (pixel.y = 0, j = 0; pixel.y < settings.pixelHeight; pixel.y += settings.blockHeight, j++) {
		block = new GraphBlock();

		block.pixel = { xMin: pixel.x, 
				xMax: pixel.x + settings.blockWidth,
				yMin: pixel.y,
				yMax: pixel.y + settings.blockHeight};

		block.point = { xMin: (pixel.x / settings.pixelWidth)  * (settings.graphDim.xMax - settings.graphDim.xMin) + settings.graphDim.xMin,
				xMax: ((pixel.x + settings.blockWidth) / settings.pixelWidth)  * (settings.graphDim.xMax - settings.graphDim.xMin) + settings.graphDim.xMin,
				yMin: (pixel.y / settings.pixelHeight) * (settings.graphDim.yMax - settings.graphDim.yMin) + settings.graphDim.yMin,
				yMax: ((pixel.y + settings.blockHeight) / settings.pixelHeight) * (settings.graphDim.yMax - settings.graphDim.yMin) + settings.graphDim.yMin };

		this.blockArray[i][j] = block;

//		console.log(JSON.stringify(block));
	    }
	}
    };

    /**
     * Put the jobs (in this case, blocks of pixels) to be calculated into a 1-dimensional array.
     *
     *
     */
    this.orderJobs = function () {
	var i, j;

/*
	for (i = 0; i < this.blockArray.length; i++) {
	    for (j = 0; j < this.blockArray[i].length; j++) {
		this.jobList.push(this.blockArray[i][j]);
	    }
	}
*/

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
	    x = Math.floor(r * Math.cos(theta));
	    y = Math.floor(r * Math.sin(theta));

	    rLimit += 0.01;

	    if (x < this.blockArray.length && y < this.blockArray[0].length && ! flagBlock[x][y]) {
		flagBlock[x][y] = 1;
		this.jobList.push(this.blockArray[x][y]);
	    }

	}
	

    };

    /**
     * Initialize server object
     * 
     */
    this.init = function () {
	this.partitionCanvas();
	this.orderJobs();
    };

    this.init();
}


/**
 * @class Code to be executed on client machines
 * 
 */
function Client () {

    var settings = {pixelWidth: 1200, pixelHeight: 900};
    settings.graphDim    = {xMin: -1.05, xMax: -0.85, yMin: 0.4, yMax: 0.2};

    this.stepsFromMandelbrot = function (cx, cy) {

	var i, a, b, zx, zy, zxn, zyn;

	zx = 0;
	zy = 0;

	for (i = 0; i < 256; i++) {
	    zxn = zx*zx - zy*zy + cx;
	    zyn = 2*zx*zy + cy;
	    
	    zx = zxn;
	    zy = zyn;

	    if (zx*zx + zy*zy > 200) {
		return i;
	    }
	}

	return 256;

    };


    this.colormap = function (key) {
	var startR = 160;
	var startG = 100;
	var startB = 0;

	var stopR  = 0;
	var stopG  = 0;
	var stopB  = 0;

	var mR = (stopR - startR) / 256;
	var mG = (stopG - startG) / 256;
	var mB = (stopB - startB) / 256;

	if (false && key == 256) {
	    return 'rgb(0,0,0)';
	} else {
	    key = -key*key/256 + 2*key
	    return ('rgb(' + Math.floor(mR * key + startR) + ',' + Math.floor(mG * key + startG) + ',' + Math.floor(mB * key + startB) + ')');
	}

    };

    this.computeBlock = function (block) {

	var xpxl, ypxl, xpt, ypt, steps;

	for (xpxl = block.pixel.xMin; xpxl < block.pixel.xMax; xpxl++) {
	    for (ypxl = block.pixel.yMin; ypxl < block.pixel.yMax; ypxl++) {
/*
		xpt = (xpxl / (block.pixel.xMax - block.pixel.xMin)) * (block.point.xMax - block.point.xMin) + block.point.xMin;
		ypt = (ypxl / (block.pixel.yMax - block.pixel.yMin)) * (block.point.yMax - block.point.yMin) + block.point.yMin;
*/
		xpt = (xpxl / (1200)) * (settings.graphDim.xMax - settings.graphDim.xMin) + settings.graphDim.xMin;
		ypt = (ypxl / (900)) * (settings.graphDim.yMax - settings.graphDim.yMin) + settings.graphDim.yMin;

		steps = this.stepsFromMandelbrot(xpt, ypt);
		ctx.fillStyle = this.colormap(steps);
		ctx.fillRect(xpxl, ypxl, 1, 1);	
	    }
	}
	
    };

    this.drawBlock = function (block) {

    };
}

(function (){

    var canvas, ctx;

    window.onload = function () {

	console.log('window.onload');

	var s = new Server();
	var c = new Client();
	
	console.log(s.blockArray);
	console.log(s.blockArray.length);
	console.log(s.blockArray[0].length);
	
	document.getElementById('plot').width = 1200;
	document.getElementById('plot').height = 900;
	
	canvas = document.getElementById('plot');
	ctx = canvas.getContext("2d");
	
	function callComputeBlock(i) {
	    console.log('inside callComputeBlock');
	    var f = function () {
		console.log('inside f, i: ' + i);
		c.computeBlock(s.jobList[i]);
	    };
	    return f;
	}
	
	var i, k = 0;
	for (i = 0; i < s.jobList.length; i++, k++) {
	    //    setTimeout('c.computeBlock(s.jobList[' + i + '])', 100 * k);    
	    console.log('setTimeout: ' + 100 * k);
	    setTimeout(callComputeBlock(i), 100 * k);    
	}
	
	
	var canvasWidth  = window.innerWidth;
	var canvasHeight = window.innerHeight;
    };
    
    //canvasWidth  = 300;
    //canvasHeight = 200;
    
    /*
      xMin = -1;
      xMax =  -.5;
      yMin =  .6;
      yMax =  .1;
      
      xMin = -2.2;
      xMax =  0.7;
      yMin =  -1.3;
      yMax =  1.3;
      
      xMin = -1.05;
      xMax =  -.85;
      yMin =  .4;
      yMax =  .2;
    */
    
    //var xPxl, yPxl;
    var pxl = {x: 0, y: 0};
    var pt = {x: 0, y: 0};
    var steps;
    
    /*
      for (pxl.x = 0; pxl.x < canvasWidth; pxl.x += 1) {
      for (pxl.y = 0; pxl.y < canvasHeight; pxl.y = pxl.y + 1) {
      pt.x = (pxl.x / canvasWidth) * (xMax - xMin) + xMin;
      pt.y = (pxl.y / canvasHeight) * (yMax - yMin) + yMin;
      steps = inMandelbrot(pt);
      ctx.fillStyle = colormap(steps);
      ctx.fillRect(pxl.x, pxl.y, 1, 1);
      
      }
      }
    */
    
    var xpxl, ypxl, xpt, ypt;
    
    /*
      for (xpxl = 0; xpxl < canvasWidth; xpxl += 1) {
      for (ypxl = 0; ypxl < canvasHeight; ypxl = ypxl + 1) {
      xpt = (xpxl / canvasWidth) * (xMax - xMin) + xMin;
      ypt = (ypxl / canvasHeight) * (yMax - yMin) + yMin;
      steps = inMandelbrot(xpt, ypt);
      ctx.fillStyle = colormap(steps);
      ctx.fillRect(xpxl, ypxl, 1, 1);	
      }
      }
    */
    
});
