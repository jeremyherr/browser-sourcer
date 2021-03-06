var data = require('../data-blocks.js');

describe("DataBlockR2R1 constructor", function () {

	var bNoOptions,
		b;

	it("uses default settings when no options provided", function () {
		bNoOptions = new data.DataBlockR2R1();

		expect(bNoOptions.parameters.xMin   ).toBe( 0);
		expect(bNoOptions.parameters.xMax   ).toBe( 1);
		expect(bNoOptions.parameters.xPoints).toBe(10);
		expect(bNoOptions.parameters.yMin   ).toBe( 0);
		expect(bNoOptions.parameters.yMax   ).toBe( 1);
		expect(bNoOptions.parameters.yPoints).toBe(10);
	});

    it("initializes parameters as specified", function () {
    	b = new data.DataBlockR2R1({
    		xMin:  -0.5,
    		xMax:   0.5,
    		xPoints: 10,
    		yMin:   1.0,
    		yMax:   2.0,
    		yPoints: 10
    	});

    	expect(b.parameters.xMin   ).toBe(-0.5);
    	expect(b.parameters.xMax   ).toBe( 0.5);
    	expect(b.parameters.xPoints).toBe(10);
    	expect(b.parameters.yMin   ).toBe( 1.0);
    	expect(b.parameters.yMax   ).toBe( 2.0);
    	expect(b.parameters.yPoints).toBe(10);

    });

    it("initializes data range values to 0", function () {
    	var i, j;

    	b.generateDomain();

    	for (i = 0; i < 10; i++) {
    		for (j = 0; j < 10; j++) {
    			expect(b.data[i][j]).toBe(0);
    		}
    	}
    });

    it("calculates a unique secret key", function () {
    	b.generateProcessingID();

    	expect(b.processingID).toBeDefined();
    	expect(b.processingID).toEqual(jasmine.any(String));
    	expect(b.processingID).not.toBe('');
    	expect(b.processingID.length).toBe(33);
    	expect(b.processingID).toMatch(/^\d{16}_\d{16}$/);
    });

});

describe("DataSetR2R1 constructor", function () {

	var d,
		dNoOptions;

	it("uses default settings when no options provided", function () {
		dNoOptions = new data.DataSetR2R1();

		expect(dNoOptions.parameters.xMin        ).toBe(  -2);
		expect(dNoOptions.parameters.xMax        ).toBe(   2);
		expect(dNoOptions.parameters.xPoints     ).toBe(1000);
		expect(dNoOptions.parameters.yMin        ).toBe(  -2);
		expect(dNoOptions.parameters.yMax        ).toBe(   2);
		expect(dNoOptions.parameters.yPoints     ).toBe(1000);
		expect(dNoOptions.parameters.xBlockPoints).toBe( 100);
		expect(dNoOptions.parameters.yBlockPoints).toBe( 100);

	});

    it("initializes parameters as specified", function () {
    	d = new data.DataSetR2R1 ({
    		xMin:          -1.3,
    		xMax:           0.6,
    		xPoints:       1200,
    		yMin:          -0.5,
    		yMax:           0.7,
    		yPoints:        900,
    		xBlockPoints:    70,
    		yBlockPoints:    60
//    		xMin:          -2,
//    		xMax:           2,
//    		xPoints:       10,
//    		yMin:          -2,
//    		yMax:           2,
//    		yPoints:       10,
//    		xBlockPoints:   2,
//    		yBlockPoints:   2
    	});

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

    	// TODO: test that the right number of blocks has been created, elements in grid are block objects, etc
    	expect(d.jobGrid[0].length).toBe(15);
    	expect(d.jobGrid[0][0]).toEqual(jasmine.any(data.DataBlockR2R1));
    });

    it("generates job list", function () {
    	var i;

    	d.generateJobList();

    	expect(d.jobList.length).toBe(270);

    	for (i = 0; i < d.jobList.length; i++) {
    		expect(d.jobList[i]).toEqual(jasmine.any(Number));
    	}

    });
});