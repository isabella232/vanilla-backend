"use strict";

const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");
const Router = require("restify-router").Router;

chai.use(chaiHttp);

const { createServer } = require("../server");
const makeTemplatesRouter = require("./templates");

const mockController = {
  listAll: () => Promise.resolve([])
};

// TODO: Why is this failing when ran with other tests but not when ran alone??
describe.skip("Template router", function() {
  const server = createServer();
  const router = makeTemplatesRouter({ controller: mockController, Router });
  const request = chai.request(server);
  router.applyRoutes(server, "/test-templates");

  describe("index query", function() {
    it("should return an empty array", function(done) {
      request.get("/test-templates").end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body)
          .to.be.an("array")
          .of.length(0);
        done();
      });
    });
  });
});
