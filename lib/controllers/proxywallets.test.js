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
    before(done => {
      model({ orderId: null }).save(() => {
        done();
      });
    });

    after(() => {
      return model.remove({}).exec();
    });

    it("should return a ProxyWallet object", async function() {
      const proxyWallet = await controller.getAvailableProxyWallet();
      proxyWallet;
      expect(proxyWallet).to.exist;
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
