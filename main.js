var path = require('path');

var handlersParser = require('./lib/handlersParser');
var registerHandlers = require('./lib/registerHandlers');
var configParser = require('./lib/configParser');

exports.configParser = configParser;

exports.generateHandlers = function (options) {
  options = options || {};

  var app = options.app;

  var handlers = handlersParser.parse({
    resourceDir: options.resourceDir || path.join( process.cwd(), 'resources'),
    timeout: options.timeout || 5000,
    prefix: options.prefix || '/api'
  });

  configParser.init(handlers);

  if (app) registerHandlers(handlers, app, options.catchAll);

  return {
    handlers: handlers
  };
};
