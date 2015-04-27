// Ractive.js Client Template Engine wrapper for SocketStream 0.3

var jade = require('jade');
var path = require('path');
var fs = require('fs');

exports.init = function(ss, config) {

	var self, debug, globals, pretty, ractivePath, clientCode, newline;

	// set config variables
	config = config || {};
	self = config.self || false;
	debug = config.debug ? config.debug : false;
	globals = config.globals || [];
	pretty = config.pretty || false;
	newline = pretty ? '\n' : '';

	// load ractive.js
	ractivePath = path.join(path.dirname(require.resolve('ractive')), config.ractiveFilename || 'ractive.min.js');
	clientCode = fs.readFileSync(ractivePath, 'utf8');
	ss.client.send('lib', 'ractive', clientCode);

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
			return newline + newline;
		},

		// Closing code once all templates have been written into the <script> tag
		suffix: function() {
			return '';
		},

		// Compile template into a function and attach to window.<windowVar>
		process: function(template, path, id, thr) {
			var html = newline + '<script id="' + id.replace(/^templates-/, '') + '" type="text/ractive">' + newline;
			html += jade.render(template, {
				compileDebug: debug,
				filename: path,
				self: self,
				globals: globals,
				pretty: pretty // NOTE: this will not work if Jade is already in use and has `pretty: false`
			});
			html += newline + '</script>' + newline + newline;
			return html;
		}

	};

};