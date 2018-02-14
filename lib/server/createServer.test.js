"use strict";

const expect = require("chai").expect;
const config = require("config");

const createServer = require("./createServer");

describe("Create server", function() {
  it("should init without options", function() {
    const server = createServer();
    const info = server.getDebugInfo();
    expect(info.server.inflightRequests).to.equal(0);
  });

  it("should init with default options", function() {
    const serverOptions = config.get("server");
    const server = createServer(serverOptions);
    const info = server.getDebugInfo();
    expect(info.server.inflightRequests).to.equal(0);
  });
});
