// This is run before any tests
before(function() {
  // eslint-disable-next-line no-console
  console.log("Loading test setup in utils/setup.test.js\n");
  process.env.NODE_ENV = "test";
});
