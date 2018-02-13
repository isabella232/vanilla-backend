"use strict";

const Schema = require("mongoose").Schema;

const orderSchema = new Schema({
  uuid: String,
  contractAddress: String
});

function makeOrderModel({ dbConnection }) {
  return (
    dbConnection.model("Order") || dbConnection.model("Order", orderSchema)
  );
}

module.exports = { makeOrderModel, orderSchema };
