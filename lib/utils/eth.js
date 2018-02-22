const crypto = require("crypto");
const { isHexadecimal } = require("validator");

function generate() {
  const rs = crypto
    .randomBytes(Math.ceil(40 / 2))
    .toString("hex")
    .slice(0, 40);
  return "0x" + rs;
}

function isETHAddress(str) {
  if (str.length !== 42) return false;
  return str.substring(0, 2) === "0x" && isHexadecimal(str.substring(2));
}

module.exports = { generate, isETHAddress };
