// Ractive.js Client Template Engine wrapper for SocketStream 0.3

var path = require('path');
var fs = require('fs');

exports.init = function(ss, config) {

	// set config variables
	config = config || {};
	var nl = config.pretty ? '\n' : '';

	// load ractive.js
	var filename = config.ractiveFilename || 'ractive.min.js';
	var ractivePath = path.join(path.dirname(require.resolve('ractive')), filename);
	var clientCode = fs.readFileSync(ractivePath, 'utf8');
	// TODO: there's a bug here, so doing this for now.
	// SEE: https://github.com/socketstream/socketstream/issues/381
	// AND: https://github.com/socketstream/socketstream/issues/353
	clientCode = clientCode.replace('//# sourceMappingURL=' + filename + '.map', '');
	ss.client.send('lib', 'ractive', clientCode);

	// load ractive.js.map
	// ractiveMapPath = path.join(path.dirname(require.resolve('ractive')), filename + '.map');
	// clientMapCode = fs.readFileSync(ractiveMapPath, 'utf8');
	// ss.client.send('lib', 'ractive-map', clientMapCode);

	return {

		name: config.namespace || 'Ractive',

		selectFormatter: function(templatePath, formatters, defaultFormatter) {
			if (path.extname(templatePath).toLowerCase() === '.jade') {
				return false;
			}
			return defaultFormatter;
		},

		// Opening code to use when a template is called for the first time
		prefix: function() {
			return nl + nl;
		},

		// Closing code once all templates have been written into the <script> tag
		suffix: function() {
			return '';
		},

		// Compile template into a function and attach to window.<windowVar>
		process: function(template, path, id) {
			return nl + '<script id="' + id.replace(/^templates-/, '') + '" type="text/ractive">' + nl + template + nl + '</script>' + nl + nl;
		}

	};

};
