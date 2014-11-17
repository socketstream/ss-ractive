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
h1 Title
p Content
```

Will compile to:

```html
<script id="test-component" type="text/ractive">
	<h1>Title</h1>
	<p>Content</p>
</script>
```

And can be registered on the client as a component with Ractive.js as follows:

```javascript
Ractive.components.TestComponent = Ractive.extend({
	template: '#test-component',
	data: {},
	// etc.
});
```