"use strict";

function makeOrdersController({ model }) {
  // TODO: Create order endpoint which ties a proxy wallet address to the order
  // TODO: How to prevent users from locking all our proxy wallets by creating many orders?
  return {
    listAll: async () => {
      const orders = await model.find({});
      return orders;
    }
  };
}

module.exports = makeOrdersController;
