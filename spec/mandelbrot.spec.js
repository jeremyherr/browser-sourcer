var mandelbrot = require('../mandelbrot.js');

describe("GraphBlock constructor", function () {
    it("initializes to zero", function () {
	var block = new mandelbrot.GraphBlock();


	expect(block.pixel.xMin).toBe(0);
	expect(block.pixel.xMax).toBe(0);
	expect(block.pixel.yMin).toBe(0);
	expect(block.pixel.yMax).toBe(0);
	expect(block.point.xMin).toBe(0);
	expect(block.point.xMax).toBe(0);
	expect(block.point.yMin).toBe(0);
	expect(block.point.yMax).toBe(0);

    });
});