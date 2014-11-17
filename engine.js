// Ractive.js Client Template Engine wrapper for SocketStream 0.3

var jade = require('jade');
var path = require('path');

exports.init = function(root, config) {

	// Set global/window variable used to access templates from the browser
	var namespace = config && config.namespace || 'Ractive';
	var self = config && config.self || false;
	var debug = config && config.debug ? config.debug : false;
	var globals = config && config.globals || [];

	return {

		name: namespace,

		selectFormatter: function(templatePath, formatters, defaultFormatter) {
			if (path.extname(templatePath).toLowerCase() === '.jade') {
				return false;
			}
			return defaultFormatter;
		},

		// Opening code to use when a template is called for the first time
		prefix: function() {
			return '';
		},

		// Closing code once all templates have been written into the <script> tag
		suffix: function() {
			return '';
		},

		// Compile template into a function and attach to window.<windowVar>
		process: function(template, path, id) {
			return '<script id="ractive-' + id + '" type="text/ractive">' + jade.render(template, {
				compileDebug: debug,
				filename: path,
				self: self,
				globals: globals
			}) + '</script>';
		}

	};

};