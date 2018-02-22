"use strict";

const expect = require("chai").expect;

const { createTestDBConnection } = require("../utils/testing");
const { makeProxyWalletModel: makeModel } = require("../models");
const makeController = require("./proxywallets");

describe("ProxyWallets controller", function() {
  let dbConnection;
  let model;
  let controller;

  before(async () => {
    dbConnection = createTestDBConnection();
    model = await makeModel(dbConnection);
    await model.remove({}).exec();
    controller = makeController({ model });
  });

  after(() => {
    dbConnection.close();
  });

  describe("getBalanceAt", function() {
    beforeEach(done => {
      const proxywallets = [
        { address: "0x8cdaf0cd259887258bc13a92c0a6da92698644c1" }
      ];
      model.collection.insert(proxywallets, {}, done);
    });

    afterEach(() => {
      return model.remove({}).exec();
    });

    it("should return balance of 0 for valid address", async function() {
      const balance = await controller.getBalanceAt(
        "0x8cdaf0cd259887258bc13a92c0a6da92698644c1"
      );
      expect(balance).to.equal("0");
    });

    it("should return null for invalid address", async function() {
      const balance = await controller.getBalanceAt("0x1234");
      expect(balance).to.equal(null);
    });
  });

  describe("getAvailableProxyWallet", function() {
    describe("when proxy wallets available", function() {
      beforeEach(done => {
        const proxywallets = [
          { orderId: null },
          { orderId: null },
          { orderId: null }
        ];
        model.collection.insert(proxywallets, {}, done);
      });

      afterEach(() => {
        return model.remove({}).exec();
      });

      it("should return one ProxyWallet object with orderId null", async function() {
        const proxyWallet = await controller.getAvailableProxyWallet();
        expect(proxyWallet).to.exist;
        expect(proxyWallet.orderId).to.equal(null);
      });
    });

    describe("when proxy wallets not available", function() {
      beforeEach(done => {
        const proxywallets = [
          { orderId: "1234" },
          { orderId: "4321" },
          { orderId: "3241" }
        ];
        model.collection.insert(proxywallets, {}, done);
      });

      afterEach(() => {
        return model.remove({}).exec();
      });

      it("should return one ProxyWallet object with orderId null", async function() {
        const proxyWallet = await controller.getAvailableProxyWallet();
        expect(proxyWallet).not.to.exist;
      });
    });
  });
});
