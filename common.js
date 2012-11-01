/** Populate parameters with defaults keys, overwriting values with given options (shallow copy)
 * @param {Object} options object containing options provided by user
 * @param {Object} defaults object containing default parameters
 * @returns {Object} object containing the keys of defaults, values of defaults, overwritten by values of options
 */
function extend (options, defaults) {
	var key,
	    parameters = {};

	if (typeof (defaults) === 'object') {
		for (key in defaults) {
			if (defaults.hasOwnProperty(key)) {
				if (typeof (defaults[key]) === 'string' || typeof (defaults[key]) === 'number' || typeof (defaults[key]) === 'boolean') {
					if (typeof (options) !== 'undefined' && key in options) {
						parameters[key] = options[key];
					} else {
						parameters[key] = defaults[key];
					}
				} else if (typeof (defaults[key]) === 'array') {
					// TODO: deal with arrays!

				} else if (typeof (defaults[key]) === 'object') {
					if (typeof (options) !== 'undefined' && key in options) {
						parameters[key] = extend(options[key], defaults[key]);
					} else {
						parameters[key] = extend(defaults[key], defaults[key]);
					}
				}
			}
		}
	}

	return parameters;
}

//If running in node.js, export constructor for use by require
if (typeof (exports) === 'object') {
	exports.extend = extend;
}
