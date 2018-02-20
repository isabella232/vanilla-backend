"use strict";

const expect = require("chai").expect;
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

const uuid = require("../utils/uuid4");

const { createServer } = require("../server");
const { createTestDBConnection } = require("../utils/testing");

const { makeOrderModel: makeModel } = require("../models");
const { makeOrdersController: makeController } = require("../controllers");

const makeRouter = require("./orders");

describe("Orders router", function() {
  let server;
  let dbConnection;
  let model;
  let controller;
  let router;

  before(() => {
    server = createServer();
    dbConnection = createTestDBConnection();
    model = makeModel(dbConnection);
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
      const testOrder = { id: uuid.generate() };
      chai
        .request(server)
        .post("/test-orders")
        .send({ order: testOrder })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body.id).to.equal(testOrder.id);
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
    it("should not allow extraneous fields", function(done) {
      const testOrder = { id: uuid.generate(), randomField: "test" };
      chai
        .request(server)
        .post("/test-orders")
        .send({ order: testOrder })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should not allow missing fields", function(done) {
      const testOrder = { randomField: "test" };
      chai
        .request(server)
        .post("/test-orders")
        .send({ order: testOrder })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should return 400 when invalid id given", function(done) {
      const testOrder = { id: "1234" };
      chai
        .request(server)
        .post("/test-orders")
        .send({ order: testOrder })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
