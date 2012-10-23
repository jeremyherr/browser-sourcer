var data = require('../data-blocks.js');

describe("DataBlock2R1R constructor", function () {

	var b = new data.DataBlock2R1R ({
		xMin: -0.5,
		xMax:  0.5,
		xStep: 10,
		yMin:  1.0,
		yMax:  2.0,
		yStep: 10
	});

	b.generateDomain();

    it("initializes parameters as specified", function () {
    	expect(b.parameters.xMin).toBe(-0.5);
    	expect(b.parameters.xMax).toBe( 0.5);
    	expect(b.parameters.xStep).toBe( 10);
    	expect(b.parameters.yMin).toBe( 1.0);
    	expect(b.parameters.yMax).toBe( 2.0);
    	expect(b.parameters.yStep).toBe( 10);

    });

    it("initializes data range values to 0", function () {
    	expect(b.data[0][0]).toBe(0);
    	expect(b.data[9][9]).toBe(0);
    });

});


