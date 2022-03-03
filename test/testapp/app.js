var restify = require('restify');
var app = restify.createServer();
var swaggerUi = require('../../index');
var swaggerDocument = require('./swagger.json');

var swaggerDocumentSplit = require('./swagger-split.json');

app.use((req, res, next) => {
	if (req.url.endsWith('/favicon.ico')) {
		res.sendFile(__dirname + '/favicon.ico');
	} else if (req.url.endsWith('/swagger.json')) {
		res.sendFile(__dirname + '/swagger.json');
	} else if (req.url.endsWith('/my-custom.css')) {
		res.sendFile(__dirname + '/my-custom.css');
	} else {
		next();
	}
});

var options = {
	validatorUrl : null,
	oauth: {
	 clientId: "your-client-id1",
	 clientSecret: "your-client-secret-if-required1",
	 realm: "your-realms1",
	 appName: "your-app-name1",
	 scopeSeparator: ",",
	 additionalQueryStringParams: {}
 },
 docExpansion: 'full',
 operationsSorter: function (a, b) {
	 var score = {
		 '/test': 1,
		 '/bar': 2
	 }
	 console.log('a', a.get("path"), b.get("path"))
	 return score[a.get("path")] < score[b.get("path")]
 }
};

app.post('/test', function(req, res) {
	console.log('req', req)
	res.json({ status: 'OK'});
});
app.get('/bar', function(req, res) { res.json({ status: 'OKISH'}); });

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, { baseURL: 'api-docs' }, options, '.swagger-ui .topbar { background-color: red }'));

app.get('/api-docs-from-url/*', ...swaggerUi.serve)
app.get('/api-docs-from-url', swaggerUi.setup(null, { baseURL: 'api-docs-from-url' }, options, '.swagger-ui .topbar { background-color: red }', null, '/swagger.json'));

var swaggerUiOpts = {
	explorer: false,
	swaggerOptions: options,
	customCss: '.swagger-ui .topbar { background-color: blue }',
	baseURL: 'api-docs-using-object'
}

app.get('/api-docs-using-object/*', ...swaggerUi.serve)
app.get('/api-docs-using-object', swaggerUi.setup(swaggerDocument, swaggerUiOpts));

var swaggerUiOpts2 = {
	explorer: false,
	swaggerOptions: options,
	customCss: '.swagger-ui .topbar { background-color: pink }',
	swaggerUrl: '/swagger.json',
	customJs: '/my-custom.js',
	operationsSorter: 'alpha',
	customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
	baseURL: 'api-docs-from-url-using-object'
}

app.get('/api-docs-from-url-using-object/*', ...swaggerUi.serve)
app.get('/api-docs-from-url-using-object', swaggerUi.setup(null, swaggerUiOpts2));

app.get('/api-docs-from-css-url/*', ...swaggerUi.serve)
app.get('/api-docs-from-css-url', swaggerUi.setup(null, {...swaggerUiOpts2, baseURL: 'api-docs-from-css-url'}));

app.get('/api-docs-split/*', ...swaggerUi.serve)
app.get('/api-docs-split', swaggerUi.setup(swaggerDocumentSplit, null, options, '.swagger-ui .topbar { background-color: orange }'));

app.get('/api-docs-with-opts/*', ...swaggerUi.serveWithOptions({ redirect: false, cacheControl: false }))
app.get('/api-docs-with-opts/', swaggerUi.setup(swaggerDocumentSplit, null, options, '.swagger-ui .topbar { background-color: orange }'));

var swaggerHtml = swaggerUi.generateHTML(swaggerDocument, {...swaggerUiOpts, baseURL: 'api-docs-html1'})

app.get('/api-docs-html1/*', ...swaggerUi.serveFiles(swaggerDocument, {...swaggerUiOpts, baseURL: 'api-docs-html1'}))
app.get('/api-docs-html1', (req, res) => { res.writeHead(200, {
    'Content-Length': Buffer.byteLength(swaggerHtml),
    'Content-Type': 'text/html'
  });
  res.write(swaggerHtml);
  res.end(); });

// app.use(function(req, res) {
//     res.send(404, 'Page not found');
// });

module.exports = app;
