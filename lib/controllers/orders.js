"use strict";

function makeOrdersController({ model }) {
  return {
    listAll: async () => {
      const orders = await model.find({});
      return orders;
    }
  };
}

module.exports = makeOrdersController;
