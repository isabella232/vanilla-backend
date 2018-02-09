"use strict";

const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");

function createServer(_options = {}) {
  const options = JSON.parse(JSON.stringify(_options));

  let corsOptions;
  if (options.cors) {
    // https://github.com/Tabcorp/restify-cors-middleware
    corsOptions = JSON.parse(JSON.stringify(options.cors));
    delete options.cors;
  }

  let throttleOptions;
  if (options.throttle) {
    // http://restify.com/docs/plugins-api/#throttle
    throttleOptions = JSON.parse(JSON.stringify(options.throttle));
    delete options.throttle;
  }

  let cpuUsageThrottleOptions;
  if (options.cpuUsageThrottle) {
    // http://restify.com/docs/plugins-api/#cpuusagethrottle
    cpuUsageThrottleOptions = JSON.parse(
      JSON.stringify(options.cpuUsageThrottle)
    );
    delete options.cpuUsageThrottle;
  }

  const server = restify.createServer(options);

  if (corsOptions) {
    const cors = corsMiddleware(corsOptions);
    server.pre(cors.preflight);
    server.use(cors.actual);
  }

  if (throttleOptions) server.pre(restify.plugins.throttle(throttleOptions));
  if (cpuUsageThrottleOptions)
    server.pre(restify.plugins.cpuUsageThrottle(cpuUsageThrottleOptions));

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  return server;
}

module.exports = createServer;
