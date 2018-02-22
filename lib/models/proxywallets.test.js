"use strict";

const sinon = require("sinon");
const expect = require("chai").expect;

const {
  createTestDBConnection,
  generateValidProxyWallet
} = require("../utils/testing");
const { makeProxyWalletModel } = require("./");

describe("ProxyWallet model", function() {
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
    const model = await makeProxyWalletModel(dbConnection);
    expect(dbConnection.model.callCount).to.be.above(0);
    expect(typeof model.find).to.equal("function");
  });

  describe("ProxyWallet schema", function() {
    let model;

    const validObj = generateValidProxyWallet();

    before(async () => {
      model = await makeProxyWalletModel(dbConnection);
      await model.remove({}).exec();
    });

    afterEach(done => {
      model.remove({}).exec(done);
    });

    describe("Valid objects", function() {
      describe("valid object with all fields set", function() {
        it("should create the order in database", async function() {
          const obj = JSON.parse(JSON.stringify(validObj));
          const newObj = await model.create(obj);
          expect(newObj.address).to.equal(obj.address);
        });
      });

      describe("valid object with only required fields set", function() {
        it("should create the order in database", async function() {
          const obj = JSON.parse(JSON.stringify(validObj));

          delete obj.orderId;
          delete obj.lastTx;

          const newObj = await model.create(obj);
          expect(newObj.address).to.equal(obj.address);
        });

        it("should create the order in database when orderId is null", async function() {
          const obj = JSON.parse(JSON.stringify(validObj));
          obj.orderId = null;
          const newObj = await model.create(obj);
          expect(newObj.address).to.equal(obj.address);
        });
      });
    });

    describe("Invalid objects", function() {});
  });
});
