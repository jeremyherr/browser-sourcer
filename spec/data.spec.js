var data = require('../data-blocks.js');

describe("DataBlock2R1R constructor", function () {

	var b = new data.DataBlock2R1R ({
		xMin:  -0.5,
		xMax:   0.5,
		xPoints: 10,
		yMin:   1.0,
		yMax:   2.0,
		yPoints: 10
	});

    it("initializes parameters as specified", function () {
    	expect(b.parameters.xMin   ).toBe(-0.5);
    	expect(b.parameters.xMax   ).toBe( 0.5);
    	expect(b.parameters.xPoints).toBe(10);
    	expect(b.parameters.yMin   ).toBe( 1.0);
    	expect(b.parameters.yMax   ).toBe( 2.0);
    	expect(b.parameters.yPoints).toBe(10);

    });

    it("initializes data range values to 0", function () {
    	b.generateDomain();

    	expect(b.data[0][0]).toBe(0);
    	expect(b.data[9][9]).toBe(0);
    });

});

describe("DataSet2R1R constructor", function () {

	var d = new data.DataSet2R1R ({
		xMin:          -1.3,
		xMax:           0.6,
		xPoints:       1200,
		yMin:          -0.5,
		yMax:           0.7,
		yPoints:        900,
		xBlockPoints:    70,
		yBlockPoints:    60,
	});

    it("initializes parameters as specified", function () {
    	expect(d.parameters.xMin        ).toBe(  -1.3);
    	expect(d.parameters.xMax        ).toBe(   0.6);
    	expect(d.parameters.xPoints     ).toBe(1200);
    	expect(d.parameters.yMin        ).toBe(  -0.5);
    	expect(d.parameters.yMax        ).toBe(   0.7);
    	expect(d.parameters.yPoints     ).toBe( 900);
    	expect(d.parameters.xBlockPoints).toBe(  70);
    	expect(d.parameters.yBlockPoints).toBe(  60);
    });

    it("generates job grid", function () {
    	d.generateJobGrid();

    	TODO: test that the right number of blocks has been created, etc
//    	console.log(d.jobGrid);

    });

});