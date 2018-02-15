"use strict";

const expect = require("chai").expect;

const { createTestDBConnection, makeMockWeb3 } = require("../utils/testing");
const { makeProxyWalletModel: makeModel } = require("../models");
const makeController = require("./proxywallets");

describe("ProxyWallets controller", function() {
  let dbConnection;
  let model;
  let controller;

  const testAddress = "test-address";
  const web3 = makeMockWeb3(testAddress);
  const ProxyWalletContract = {};

  before(() => {
    dbConnection = createTestDBConnection();
    model = makeModel(dbConnection);
    controller = makeController({
      model,
      web3,
      ProxyWalletContract
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

  describe("deploy", function() {
    it("should return a address", async function() {
      const address = await controller.deploy();
      expect(address).to.equal(testAddress);
    });
  });

  describe("destroy", function() {
    it("should return", async function() {
      const response = await controller.destroy();
      expect(response).to.exist;
    });
  });

  describe("testBalance", function() {
    it("should return", async function() {
      const response = await controller.testBalance();
      expect(response).to.exist;
    });
  });

  describe("getBalance", function() {
    it("should return", async function() {
      const response = await controller.getBalance();
      expect(response).to.exist;
    });
  });
});
