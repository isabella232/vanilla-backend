"use strict";

const expect = require("chai").expect;

const {
  createTestDBConnection,
  generateValidOrder
} = require("../utils/testing");
const { makeOrderModel: makeModel } = require("../models");
const makeController = require("./orders");

describe("Orders controller", function() {
  let dbConnection;
  let model;
  let controller;

  before(async () => {
    dbConnection = createTestDBConnection();
    model = await makeModel(dbConnection);
    await model.remove({}).exec();
    controller = makeController({ model });
  });

  afterEach(done => {
    model.remove({}).exec(done);
  });

  after(() => {
    dbConnection.close();
  });

  describe("createOrder", function() {
    it("should be able to create a valid order", async function() {
      const order = generateValidOrder();
      const orderFromDb = await controller.createOrder(order);
      expect(orderFromDb).to.be.an("object");
      expect(orderFromDb.orderId).to.equal(order.orderId);
    });
  });

  describe("getOrder", function() {
    let order;

    before(async () => {
      order = generateValidOrder();
      await model(order).save();
    });

    it("should be able to fetch an order", async function() {
      const orderFromDb = await controller.getOrder(order.orderId);
      expect(orderFromDb).to.be.an("object");
      expect(orderFromDb.orderId).to.equal(order.orderId);
    });
  });

  describe("listAll", function() {
    it("should return an empty list", async function() {
      const templateList = await controller.listAll();
      expect(templateList)
        .to.be.an("array")
        .of.length(0);
    });
  });
});
