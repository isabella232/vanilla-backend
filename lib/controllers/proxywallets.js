"use strict";

function makeProxyWalletsController({ model, web3, ProxyWalletContract }) {
  async function getAvailableProxyWallet() {
    const proxyWallet = await model
      .findOne({
        orderId: null
      })
      .exec();

    return proxyWallet;
  }

  async function deploy() {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];

    const abi = ProxyWalletContract.abi;
    const bytecode = "0x" + ProxyWalletContract.byteCode;

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
  }

  async function destroy(contractAddress) {
    const accounts = await web3.eth.getAccounts();
    const ProxyWallet = new web3.eth.Contract(
      ProxyWalletContract.abi,
      contractAddress
    );
    await ProxyWallet.methods
      .destroy()
      .send({
        from: accounts[0]
      })
      .then(() => {
        return true;
      });
    return false;
  }

  async function testBalance(contractAddress) {
    const accounts = await web3.eth.getAccounts();
    const send = await web3.eth.sendTransaction({
      from: accounts[0],
      to: contractAddress,
      value: 5
    });
    return send;
  }

  async function getBalance(contractAddress) {
    let balance = 0;
    balance = await web3.eth.getBalance(contractAddress);
    return balance;
  }

  return {
    getAvailableProxyWallet,
    deploy,
    destroy,
    testBalance,
    getBalance
  };
}

module.exports = makeProxyWalletsController;
