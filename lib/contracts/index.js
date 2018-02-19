const web3 = require("./web3");
const OrdersManagerAbi = require("./OrdersManagerAbi");
const ProxyWalletAbi = require("./ProxyWalletAbi");

function makeContract(abi, address) {
  if (address) return new web3.eth.Contract(abi, address);
  else return new web3.eth.Contract(abi);
}

const makeOrdersManagerContract = makeContract.bind(null, OrdersManagerAbi);
const makeProxyWalletContract = makeContract.bind(null, ProxyWalletAbi);

module.exports = {
  makeOrdersManagerContract,
  makeProxyWalletContract
};
