"use strict";

const expect = require("chai").expect;
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { createServer } = require("../server");
const makeRouter = require("./proxywallets");

describe("Proxywallets router", function() {
  const testAddress = "test-address";
  const mockController = {
    getAvailableProxyWallet: () => ({ address: testAddress })
  };

  const server = createServer();
  const router = makeRouter({ controller: mockController });
  router.applyRoutes(server, "/test-proxywallets");

  describe("index query", function() {
    it("should return 200", function(done) {
      chai
        .request(server)
        .get("/test-proxywallets")
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.equal(testAddress);
          done();
        });
    });
  });
});
