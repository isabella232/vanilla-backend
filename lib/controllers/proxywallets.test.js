"use strict";

const expect = require("chai").expect;

const { createTestDBConnection } = require("../utils/testing");
const { makeProxyWalletModel: makeModel } = require("../models");
const makeController = require("./proxywallets");

describe("ProxyWallets controller", function() {
  let dbConnection;
  let model;
  let controller;

  before(() => {
    dbConnection = createTestDBConnection();
    model = makeModel(dbConnection);
    controller = makeController({
      model
    });
  });

  after(() => {
    dbConnection.close();
  });

  describe("getAvailableProxyWallet", function() {
    describe("when proxy wallets available", function() {
      before(done => {
        const proxywallets = [
          { orderId: null },
          { orderId: null },
          { orderId: null }
        ];
        model.collection.insert(proxywallets, {}, done);
      });

      after(() => {
        return model.remove({}).exec();
      });

      it("should return one ProxyWallet object with orderId null", async function() {
        const proxyWallet = await controller.getAvailableProxyWallet();
        expect(proxyWallet).to.exist;
        expect(proxyWallet.orderId).to.equal(null);
      });
    });

    describe("when proxy wallets not available", function() {
      before(done => {
        const proxywallets = [
          { orderId: "1234" },
          { orderId: "4321" },
          { orderId: "3241" }
        ];
        model.collection.insert(proxywallets, {}, done);
      });

      after(() => {
        return model.remove({}).exec();
      });

      it("should return one ProxyWallet object with orderId null", async function() {
        const proxyWallet = await controller.getAvailableProxyWallet();
        expect(proxyWallet).not.to.exist;
      });
    });
  });
});
