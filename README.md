# Ractive Template Engine wrapper for SocketStream 0.3

http://www.ractivejs.org/

Ractive client-side templates in your app, precompiled with Jade.

### Setup

Add `ss-ractive` to your application's `package.json` file:

```
npm install ss-ractive@latest --save
```

Then add this line to app.js:

```javascript
ss.client.templateEngine.use(require('ss-ractive'));
```

### Usage

Ss-ractive (for now) relies on precompiled Jade templates, wrapped in `<script type="text/ractive">` tags. For example, a file located at `/client/templates/test/component.jade` with the following content:

```jade
h1 {{title}}
| {{{content}}}
```

Will compile to HTML script tags:

```html
<script id="ractive-test-component" type="text/ractive"><h1>{{title}}</h1>{{{content}}}</script>
```

And can be registered on the client as a component with Ractive.js as follows:

```javascript
Ractive.components.TestComponent = Ractive.extend({
	template: '#ractive-test-component',
	data: {
		title: 'This Is The Title',
		content: '<p>Sample content <em>here</em>.</p>'
	},
	// etc.
});
```

Notice the prefix `ractive-` to avoid namespace collision. Note also the preservation of handlebars syntax in the compiled templates, since Ractive.js relies heavily on Handlebars-like syntax [see the Ractive.js documentation](http://docs.ractivejs.org/latest/get-started).

This wrapper also allows for pretty output for development, as well as loading a legacy ractive file:

```javascript
ss.client.templateEngine.use(require('ss-ractive'), '/', {
	// pretty html
	pretty: true,
	// load a different ractive filename from the npm repo (the path is resolved via require.resolve('ractive'))
	ractiveFilename: 'ractive-legacy.runtime.min.js'
	// other options:
	self: self,
	debug: true,
	globals: [...],

});
```