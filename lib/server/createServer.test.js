"use strict";

const expect = require("chai").expect;

const createServer = require("./createServer");

describe("Create server", function() {
  it("should init without options", function() {
    const server = createServer();
    const info = server.getDebugInfo();
    expect(info.server.inflightRequests).to.equal(0);
  });
});
