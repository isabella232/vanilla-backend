"use strict";
const Web3 = require("web3");
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
const ProxyWalletContract = require("../contracts/ProxyWallet.json");

function makeProxyWalletsController() {
  return {
    deploy: async () => {
      const accounts = await web3.eth.getAccounts();
      web3.eth.defaultAccount = accounts[0];

      const contract = ProxyWalletContract;

      const abi = contract.abi;
      const bytecode = "0x" + contract.byteCode;

      const ProxyWallet = new web3.eth.Contract(abi);

      let estimatedGas, contractAddress;

      await ProxyWallet.deploy({
        data: bytecode,
        arguments: []
      }).estimateGas((err, gas) => {
        estimatedGas = gas;
      });

      await ProxyWallet.deploy({
        data: bytecode,
        arguments: []
      })
        .send({
          from: accounts[0],
          gas: estimatedGas,
          gasPrice: "30000000000000"
        })
        .on("error", function(error) {
          //eslint-disable-next-line
          console.log(`Error in spawning a smart contract: ${error}`);
        })
        .on("receipt", function(receipt) {
          contractAddress = receipt.contractAddress;
        });

      return contractAddress;
    },
    destroy: async () => {
      return false;
    }
  };
}

module.exports = makeProxyWalletsController;
