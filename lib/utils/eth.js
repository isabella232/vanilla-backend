const Web3 = require("web3");

function generate() {
  return Web3.utils.randomHex(20);
}

function isETHAddress(str) {
  if (str.length !== 42) return false;
  return Web3.utils.isHexStrict(str);
}

function isSoliditySha3(str) {
  if (str.length !== 66) return false;
  return Web3.utils.isHexStrict(str);
}

module.exports = { generate, isETHAddress, isSoliditySha3 };
