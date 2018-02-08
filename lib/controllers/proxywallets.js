"use strict";
const Web3 = require("web3");
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
const ProxyWalletContract = require("../contracts/ProxyWallet.json");

function makeProxyWalletsController() {
  return {
    deploy: async () => {
      const contract = ProxyWalletContract;
      const abi = contract.abi;
      //const bytecode = "0x" + contract.byteCode;
      web3.eth.defaultAccount = web3.eth.accounts[0];

      const contractInstance = new web3.eth.Contract(abi, (err, res) => {
        if (err) {
          //eslint-disable-next-line
          console.log(err);
          return;
        }

        // Log the tx, you can explore status with eth.getTransaction()
        //eslint-disable-next-line
        console.log(res.transactionHash);

        // If we have an address property, the contract was deployed
        if (res.address) {
          //eslint-disable-next-line
          console.log("Contract address: " + res.address);
          return res.address;
        }
      });
      return contractInstance.address;

      // We need to wait until any miner has included the transaction
      // in a block to get the address of the instance
      /* async function checkTransactionReceipt() {
        const receipt = await web3.eth.getTransactionReceipt(
          ProxyWallet.transactionHash
        );
        if (receipt && receipt.contractAddress) {
          return receipt.contractAddress;
        }
      }

      return checkTransactionReceipt(); */
    },
    destroy: async () => {
      return false;
    }
  };
}

module.exports = makeProxyWalletsController;
