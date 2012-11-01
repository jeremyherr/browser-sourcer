var project = require('../project.js'),
	data    = require('../data-blocks.js');

describe("Project constructor", function () {

	var pNoOptions,
		p;

	it("uses default settings when no options provided", function () {
		pNoOptions = new project.Project();

		expect(pNoOptions.parameters.name                          ).toBe('mandelbrot');
		expect(pNoOptions.parameters.dataSetConstructor            ).toBe('DataSetR2R1');
		expect(pNoOptions.parameters.dataSetParameters.xMin        ).toBe(  -2);
		expect(pNoOptions.parameters.dataSetParameters.xMax        ).toBe(   2);
		expect(pNoOptions.parameters.dataSetParameters.xPoints     ).toBe(1000);
		expect(pNoOptions.parameters.dataSetParameters.yMin        ).toBe(  -2);
		expect(pNoOptions.parameters.dataSetParameters.yMax        ).toBe(   2);
		expect(pNoOptions.parameters.dataSetParameters.yPoints     ).toBe(1000);
		expect(pNoOptions.parameters.dataSetParameters.xBlockPoints).toBe( 100);
		expect(pNoOptions.parameters.dataSetParameters.yBlockPoints).toBe( 100);
	});

    it("initializes parameters as specified", function () {
    	p = new project.Project({
			name: 'riemann-zeta-absolute-value',
			dataSetConstructor: 'DataSetR2R1',
			dataSetParameters: {
				xMin:         0.3,
				xMax:         4.5,
				xPoints:    10000,
				yMin:        -100,
				yMax:         100,
				yPoints:    10000,
				xBlockPoints: 200,
				yBlockPoints: 200
    		}
    	});

    	expect(p.parameters.name                          ).toBe('riemann-zeta-absolute-value');
		expect(p.parameters.dataSetConstructor            ).toBe('DataSetR2R1');
		expect(p.parameters.dataSetParameters.xMin        ).toBe(  0.3);
		expect(p.parameters.dataSetParameters.xMax        ).toBe(  4.5);
		expect(p.parameters.dataSetParameters.xPoints     ).toBe(10000);
		expect(p.parameters.dataSetParameters.yMin        ).toBe( -100);
		expect(p.parameters.dataSetParameters.yMax        ).toBe(  100);
		expect(p.parameters.dataSetParameters.yPoints     ).toBe(10000);
		expect(p.parameters.dataSetParameters.xBlockPoints).toBe(  200);
		expect(p.parameters.dataSetParameters.yBlockPoints).toBe(  200);

    });

	it("specifies a data set corresponding to an existing constructor", function () {
		var callConstructor = function () {
			var ds = new data[p.parameters.dataSetConstructor];
		};

		expect(callConstructor).not.toThrow();
	});

});