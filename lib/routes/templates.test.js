"use strict";

const expect = require("chai").expect;
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { createServer } = require("../server");
const makeRouter = require("./templates");

describe("Templates router", function() {
  const mockController = {
    listAll: () => Promise.resolve([])
  };

  const server = createServer();
  const router = makeRouter({ controller: mockController });
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
