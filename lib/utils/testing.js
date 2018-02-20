const config = require("config");
const mongoose = require("mongoose");

function createTestDBConnection() {
  return mongoose.createConnection(config.get("database.all"));
}

module.exports = { createTestDBConnection };
