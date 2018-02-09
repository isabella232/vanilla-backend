"use strict";

function makeOrdersModel({ dbConnection, Schema }) {
  const orderschema = new Schema({
    uuid: String,
    contractAddress: String
  });

  return dbConnection.model("Order", orderschema);
}

module.exports = makeOrdersModel;
