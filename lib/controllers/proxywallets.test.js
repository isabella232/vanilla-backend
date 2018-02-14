"use strict";

const expect = require("chai").expect;

const { testDBConnection: dbConnection } = require("../utils/testing");
const { makeProxyWalletModel } = require("../models");
const makeController = require("./proxywallets");

describe("ProxyWallets controller", function() {
  const model = makeProxyWalletModel(dbConnection);

  const testAddress = "test-address";
  const web3 = {
    eth: {
      getAccounts: () => [],
      getBalance: () => "",
      sendTransaction: () => "",
      Contract: function() {
        this.methods = {
          destroy: () => ({
            send: async () => ""
          })
        };
        this.deploy = () => this;
        this.estimateGas = async cb => {
          cb(null, 0);
          return this;
        };
        this.send = () => this;
        this.on = (event, cb) => {
          switch (event) {
            case "error":
              cb("error");
              break;
            case "receipt":
              cb({ contractAddress: testAddress });
              break;
            default:
              break;
          }

          return this;
        };
      }
    }
  };
  const ProxyWalletContract = {};

  const controller = makeController({
    model,
    web3,
    ProxyWalletContract
  });

  describe.skip("getAvailableProxyWallet", function() {
    it("should return a ProxyWallet object", async function() {
      const proxyWallet = await controller.getAvailableProxyWallet();
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
