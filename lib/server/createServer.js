"use strict";

const restify = require("restify");

function createServer(options = {}) {
  const throttleOptions = Object.assign({}, options.throttle, {
    // http://restify.com/docs/plugins-api/#throttle
    burst: 10, // Max 10 concurrent requests
    rate: 0.5, // Steady state: 1 request / 2 seconds
    ip: true // throttle per IP
  });

  const cpuUsageThrottleOptions = Object.assign({}, options.cpuUsageThrottle, {
    // http://restify.com/docs/plugins-api/#cpuusagethrottle
    limit: 0.75, // Start throttling at 75% CPU usage
    max: 0.95, // 100% throttle at 95% CPU usage
    interval: 250,
    halfLife: 500
  });

  delete options.throttle;
  delete options.cpuUsageThrottle;

  const serverOptions = Object.assign({}, options, {
    acceptable: ["application/json"]
  });

  const server = restify.createServer(serverOptions);

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  server.pre(restify.plugins.throttle(throttleOptions));
  server.pre(restify.plugins.cpuUsageThrottle(cpuUsageThrottleOptions));

  return server;
}

module.exports = createServer;
