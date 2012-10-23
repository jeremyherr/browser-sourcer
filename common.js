/** Populate parameters with defaults keys, overwriting values with given options (shallow copy)
 * @param {Object} options object containing options provided by user
 * @param {Object} defaults object containing default parameters
 * @returns {Object} object containing the keys of defaults, values of defaults, overwritten by values of options
 */
function extend (options, defaults) {
	var k,
	    parameters = {};

	for (k in defaults) {
		if (defaults.hasOwnProperty(k)) {
			parameters[k] = options[k];
		}
	}

	return parameters;
}

//If running in node.js, export constructor for use by require
if (typeof (exports) === 'object') {
	exports.extend = extend;
}
