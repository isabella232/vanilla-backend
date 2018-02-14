const config = require("config");
const mongoose = require("mongoose");

const testDBConnection = mongoose.createConnection(config.get("database.all"));

module.exports = {
  testDBConnection
};
