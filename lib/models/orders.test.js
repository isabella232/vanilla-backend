"use strict";

/* eslint-disable security/detect-object-injection */

const sinon = require("sinon");
const expect = require("chai").expect;
const config = require("config");
const Web3 = require("web3");

const {
  createTestDBConnection,
  generateValidOrder
} = require("../utils/testing");
const { makeOrderModel } = require("./");

describe("Order model", function() {
  let dbConnection;

  before(() => {
    dbConnection = createTestDBConnection();
  });

  beforeEach(() => {
    sinon.spy(dbConnection, "model");
  });

  afterEach(() => {
    dbConnection.model.restore();
  });

  after(() => {
    dbConnection.close();
  });

  it("should be able to init the model", async function() {
    const model = await makeOrderModel(dbConnection);
    expect(dbConnection.model.callCount).to.be.above(0);
    expect(typeof model.find).to.equal("function");
  });

  describe("Order schema", function() {
    let model;

    const validOrderObj = generateValidOrder();

    before(async () => {
      model = await makeOrderModel(dbConnection);
      await model.remove({}).exec();
    });

    afterEach(done => {
      model.remove({}).exec(done);
    });

    describe("Valid orders", function() {
      describe("valid order with all fields set", function() {
        it("should create the order in database", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));

          const newOrder = await model.create(orderObj);
          expect(newOrder.orderId).to.equal(orderObj.orderId);

          const orderFromDb = await model
            .findOne({
              orderIdHash: orderObj.orderIdHash
            })
            .exec();

          expect(orderFromDb.orderId).to.equal(orderObj.orderId);
        });
      });

      describe("valid order with only required fields set", function() {
        it("should create the order in database", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));

          delete orderObj.managerContractAddress;
          delete orderObj.proxyWalletAddress;
          delete orderObj.userEmail;

          const newOrder = await model.create(orderObj);
          expect(newOrder.orderId).to.equal(orderObj.orderId);

          const orderFromDb = await model
            .findOne({
              orderIdHash: orderObj.orderIdHash
            })
            .exec();

          expect(orderFromDb.orderId).to.equal(orderObj.orderId);
          expect(orderFromDb.managerContractAddress).to.equal(null);
          expect(orderFromDb.proxyWalletAddress).to.equal(null);
          expect(orderFromDb.userEmail).to.equal(null);
        });
      });
    });

    describe("Invalid orders", function() {
      describe("orderId", function() {
        const field = "orderId";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].slice(0, -1);

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field] + "1";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].replace(/-/g, "x");

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("orderIdHash", function() {
        const field = "orderIdHash";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].slice(0, -1);

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field] + "1";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].replace(/[abcdef]/g, "x");

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("positionType", function() {
        const field = "positionType";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "LON";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "LONGS";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "WEIRD";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("positionLeverage", function() {
        const field = "positionLeverage";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow negative", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = -1;

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too big", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = 6;

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "WEIRD";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("positionDuration", function() {
        const field = "positionDuration";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow negative", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = -1;

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too big", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = 61;

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "WEIRD";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("currencyPair", function() {
        const field = "currencyPair";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "ETH-US";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "ETH-USDS";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "ETH-BTC";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("amount", function() {
        const field = "amount";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow negative", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          let tempAmount = Web3.utils.toBN(0);
          tempAmount = tempAmount.sub(Web3.utils.toBN(1));
          orderObj[field] = tempAmount.toString();

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too big", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          let tempAmount = Web3.utils.toBN(
            config.get("constants.order.amountMax")
          );
          tempAmount = tempAmount.add(Web3.utils.toBN(1));
          orderObj[field] = tempAmount.toString();

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "WEIRD";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("withdrawAddress", function() {
        const field = "withdrawAddress";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow without", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          delete orderObj[field];

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].slice(0, -1);

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field] + "1";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].replace(/[abcdef]/g, "x");

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("managerContractAddress", function() {
        const field = "managerContractAddress";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].slice(0, -1);

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field] + "1";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].replace(/[abcdef]/g, "x");

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("proxyWalletAddress", function() {
        const field = "proxyWalletAddress";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow too short", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].slice(0, -1);

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow too long", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field] + "1";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = orderObj[field].replace(/[abcdef]/g, "x");

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });

      describe("userEmail", function() {
        const field = "userEmail";
        let newOrder;
        let error;

        beforeEach(() => {
          newOrder = null;
          error = null;
        });

        it("should not allow wrong format", async function() {
          const orderObj = JSON.parse(JSON.stringify(validOrderObj));
          orderObj[field] = "user.email.com";

          try {
            newOrder = await model.create(orderObj);
          } catch (e) {
            error = e;
          }
          expect(error).to.exist;
          expect(error.errors[field]).to.exist;
          expect(newOrder).not.to.exist;
        });
      });
    });
  });
});
