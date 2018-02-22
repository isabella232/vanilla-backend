"use strict";

const expect = require("chai").expect;
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

const { createServer } = require("../server");
const {
  createTestDBConnection,
  generateValidOrder
} = require("../utils/testing");

const { makeOrderModel: makeModel } = require("../models");
const { makeOrdersController: makeController } = require("../controllers");

const makeRouter = require("./orders");

describe("Orders router", function() {
  let server;
  let dbConnection;
  let model;
  let controller;
  let router;

  const testOrder = generateValidOrder();

  before(async () => {
    server = createServer();
    dbConnection = createTestDBConnection();
    model = await makeModel(dbConnection);
    controller = makeController({ model });
    router = makeRouter({ controller });
    router.applyRoutes(server, "/test-orders");
  });

  afterEach(done => {
    model.remove({}).exec(done);
  });

  after(() => {
    dbConnection.close();
  });

  describe("index get query", function() {
    it("should return 405", function(done) {
      chai
        .request(server)
        .get("/test-orders")
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(405);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("proper index post", function() {
    it("should return 201", function(done) {
      chai
        .request(server)
        .post("/test-orders")
        .send({ order: testOrder })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body.orderId).to.equal(testOrder.orderId);
          done();
        });
    });
  });

  describe("empty index post", function() {
    it("should return 400", function(done) {
      chai
        .request(server)
        .post("/test-orders")
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("invalid index post", function() {
    it("should return 400", function(done) {
      const invalidTestOrder = JSON.parse(JSON.stringify(testOrder));
      invalidTestOrder["orderIdHash"] = "1234";

      chai
        .request(server)
        .post("/test-orders")
        .send({ order: invalidTestOrder })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
