"use strict";

// eslint-disable

const sinon = require("sinon");
const expect = require("chai").expect;

const { createTestDBConnection } = require("../utils/testing");
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

    const validOrderObj = {
      orderId: "75bf110e-07bc-4d2b-9cbc-7cc3460d88b0",
      orderIdHash:
        "9d4ed7166c33b470c9dd96b3cb749be36bc481b0b76119e9ea30cfa78af9ae2b",
      positionType: "LONG",
      positionLeverage: "4",
      positionDuration: 14,
      currencyPair: "ETH-USD",
      dateCreated: Date.now(),
      amount: 10000000,
      withdrawAddress: "0xd2c20f9408b95041e0998c83678613de382627c8",
      managerContractAddress: "0xd2c20f9408b95041e0998c83678613de382627c8",
      proxyWalletAddress: "0xd2c20f9408b95041e0998c83678613de382627c8",
      userEmail: "user@example.com"
    };

    before(async () => {
      model = await makeOrderModel(dbConnection);
    });

    describe("Valid orders", function() {
      afterEach(done => {
        model.remove({}).exec(done);
      });

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
      afterEach(done => {
        model.remove({}).exec(done);
      });

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
          orderObj[field] = "1234";

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
          orderObj[field] = "75bf110e-07bc-4d2b-9cbc-7cc3460d88b01";

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
          orderObj[field] = "75bf110eX07bcX4d2bX9cbcX7cc3460d88b0";

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
          orderObj[field] =
            "9d4ed7166c33b470c9dd96b3cb749be36bc481b0b76119e9ea30cfa78af9ae2";

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
          orderObj[field] =
            "9d4ed7166c33b470c9dd96b3cb749be36bc481b0b76119e9ea30cfa78af9ae2b1";

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
          orderObj[field] =
            "9d4ed7166c33b470c9dd96b3cb749be36bc481b0b76119e9ea30cfa78af9ae2Y";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de382627c";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de382627c8b";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de3826278x";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de382627c";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de382627c8b";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de3826278x";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de382627c";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de382627c8b";

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
          orderObj[field] = "0xd2c20f9408b95041e0998c83678613de3826278x";

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
