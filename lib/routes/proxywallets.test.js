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
    deploy: () => testAddress,
    destroy: () => "",
    testBalance: () => "",
    getBalance: () => 0
  };

  const server = createServer();
  const router = makeRouter({ controller: mockController });
  router.applyRoutes(server, "/test-proxywallets");

  describe("index query", function() {
    it("should return 404", function(done) {
      chai
        .request(server)
        .get("/test-proxywallets")
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("create query", function() {
    it("should return 200", function(done) {
      chai
        .request(server)
        .get("/test-proxywallets/create")
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("balance query", function() {
    it("should return 200", function(done) {
      chai
        .request(server)
        .get(`/test-proxywallets/balance/${testAddress}`)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("pay query", function() {
    it("should return 200", function(done) {
      chai
        .request(server)
        .get(`/test-proxywallets/pay/${testAddress}`)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("destroy query", function() {
    it("should return 200", function(done) {
      chai
        .request(server)
        .get(`/test-proxywallets/destroy/${testAddress}`)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });
});
