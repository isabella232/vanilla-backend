"use strict";

function makeOrdersController({ model }) {
  // TODO: Create order endpoint which ties a proxy wallet address to the order
  // TODO: How to prevent users from locking all our proxy wallets by creating many orders?
  async function createOrder(order) {
    const newOrder = await model.create(order);
    return newOrder;
  }

  async function listAll() {
    const orders = await model.find({});
    return orders;
  }

  return {
    createOrder,
    listAll
  };
}

module.exports = makeOrdersController;
