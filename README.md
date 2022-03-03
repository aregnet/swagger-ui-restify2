# Swagger UI Restify2

| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/statements-85.56%25-yellow.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-79.66%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-92.3%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-85.41%25-yellow.svg?style=flat)    |

This module allows you to serve auto-generated [swagger-ui](https://swagger.io/tools/swagger-ui/) generated API docs from restify, based on a `swagger.json` file. The result is living documentation for your API hosted from your API server via a route. The module is based on the code of [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express).

Swagger version is pulled from npm module swagger-ui-dist. Please use a lock file or specify the version of swagger-ui-dist you want to ensure it is consistent across environments.

You may be also interested in:

* [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc): Allows you to markup routes
with jsdoc comments. It then produces a full swagger yml config dynamically, which you can pass to this module to produce documentation. See below under the usage section for more info.
* [swagger tools](https://github.com/swagger-api): Various tools, including swagger editor, swagger code gen etc.

## Usage

Install using npm:

```bash
$ npm install swagger-ui-restify2
```

Restify setup `app.js`
```javascript
const restify = require('restify');
const app = restify.createServer();
const swaggerUi = require('swagger-ui-restify2');
const swaggerDocument = require('./swagger.json');

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, { baseURL: 'api-docs' });

```

Open http://`<app_host>`:`<app_port>`/api-docs in your browser to view the documentation.

### [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)

If you are using swagger-jsdoc simply pass the swaggerSpec into the setup function:

```javascript
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, { baseURL: 'api-docs' }));

```

### Swagger Explorer

By default the Swagger Explorer bar is hidden, to display it pass true as the 'explorer' property of the options to the setup function:

```javascript
const restify = require('restify');
const app = restify.createServer();
const swaggerUi = require('swagger-ui-restify2');
const swaggerDocument = require('./swagger.json');

var options = {
  explorer: true,
  baseURL: 'api-docs'
};

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, options));
```

### Custom swagger options

To pass custom options e.g. validatorUrl, to the SwaggerUi client pass an object as the 'swaggerOptions' property of the options to the setup function:

```javascript
const restify = require('restify');
const app = restify.createServer();
const swaggerUi = require('swagger-ui-restify2');
const swaggerDocument = require('./swagger.json');

var options = {
  swaggerOptions: {
    validatorUrl: null
  },
  baseURL: 'api-docs'
};

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, options));
```

For all the available options, refer to [Swagger UI Configuration](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md)

### Custom CSS styles

To customize the style of the swagger page, you can pass custom CSS as the 'customCss' property of the options to the setup function.

E.g. to hide the swagger header:

```javascript
const restify = require('restify');
const app = restify.createServer();
const swaggerUi = require('swagger-ui-restify2');
const swaggerDocument = require('./swagger.json');

var options = {
  customCss: '.swagger-ui .topbar { display: none }',
  baseURL: 'api-docs'
};

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, options));
```

### Custom CSS styles from Url

You can also pass the url to a custom css file, the value must be the public url of the file and can be relative or absolute to the swagger path.

```javascript
const restify = require('restify');
const app = restify.createServer();
const swaggerUi = require('swagger-ui-restify2');
const swaggerDocument = require('./swagger.json');

var options = {
  customCssUrl: '/custom.css',
  baseURL: 'api-docs'
};

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, options));
```

### Custom JS

If you would like to have full control over your HTML you can provide your own javascript file, value accepts absolute or relative path. Value must be the public url of the js file.

```javascript
const restify = require('restify');
const app = restify.createServer();
const swaggerUi = require('swagger-ui-restify2');
const swaggerDocument = require('./swagger.json');

var options = {
  customJs: '/custom.js',
  baseURL: 'api-docs'
};

app.get('/api-docs/*', ...swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, options));
```

## Requirements

* Node v0.10.32 or above
* Restify 5 or above

## Testing

* Install phantom
* `npm install`
* `npm test`
