'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    config = require(path.join(__dirname, 'config'));

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 4040;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use(function crossOrigin(req, res, next){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers",
          'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Length, Content-Disposition');
      res.header("Access-Control-Expose-Headers", "Content-Disposition, Content-Length, Content-Type");
      return next();
  });

  mongoose.promise = global.Promise;

  mongoose.connect(config.db.uri, config.db.options, null, function(err){
    if (err) {
      console.error(err);
    }
  });

  mongoose.connection.on('error', function(err){
      console.error('[ERROR] app.js Database Connection Error. Please make sure that DB engine is running.');
      console.error(err);
      process.exit(1);
  });

    mongoose.connection.on('open', function(){
        console.info('[INFO] app.js Connected to Database server.');

        // Start the server
        http.createServer(app).listen(serverPort, function () {
            console.log('Server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
            console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
        });
    });

});
