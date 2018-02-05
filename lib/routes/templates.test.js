"use strict";

const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const createServer = require("../createServer");
const makeTemplatesRouter = require("./templates");

const mockController = {
  listAll: () => []
};

describe("Template router", function() {
  const server = createServer();
  const router = makeTemplatesRouter({ controller: mockController });
  router.applyRoutes(server, "/test-templates");

  describe("index query", function() {
    it("should return an empty array", function(done) {
      chai
        .request(server)
        .get("/test-templates")
        .end(function(err, res) {
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
