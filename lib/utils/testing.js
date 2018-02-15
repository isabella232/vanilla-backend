const config = require("config");
const mongoose = require("mongoose");

function createTestDBConnection() {
  return mongoose.createConnection(config.get("database.all"));
}

function makeMockWeb3(contractAddress) {
  return {
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
              cb({ contractAddress });
              break;
            default:
              break;
          }

          return this;
        };
      }
    }
  };
}

module.exports = {
  createTestDBConnection,
  makeMockWeb3
};
