"use strict";
const Web3 = require("web3");
const ProxyWalletContract = require("../contracts/ProxyWallet.json");

function makeProxyWalletsController() {
  return {
    deploy: async () => {
      let web3 = new Web3();
      web3.setProvider(
        new web3.providers.HttpProvider("http://localhost:8545")
      );
      const contract = JSON.parse(ProxyWalletContract);
      const abi = contract.abi;
      const code = "0x" + contract.byteCode;
      const ProxyWallet = web3.eth.contract(abi);

      const password = "";
      try {
        web3.personal.unlockAccount(web3.eth.coinbase, password);
      } catch (e) {
        return;
      }

      const instance = ProxyWallet.new({
        from: web3.eth.coinbase,
        gas: 1000000,
        data: code
      });

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      // We need to wait until any miner has included the transaction
      // in a block to get the address of the instance
      async function checkTransactionReceipt() {
        const receipt = web3.eth.getTransactionReceipt(
          instance.transactionHash
        );
        if (receipt && receipt.contractAddress) {
          return receipt.contractAddress;
        }
        await sleep(4000);
        checkTransactionReceipt();
      }
      checkTransactionReceipt();
    },
    destroy: async () => {
      return false;
    }
  };
}

module.exports = makeProxyWalletsController;
