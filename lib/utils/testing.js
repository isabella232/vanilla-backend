const mockConnection = {
  model: (name, schema) => {
    if (!schema) return null;
    return {};
  }
};

const mockModel = {
  find: () => Promise.resolve([])
};

module.exports = {
  mockConnection,
  mockModel
};
