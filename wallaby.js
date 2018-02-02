module.exports = function() {
  return {
    files: ["!lib/**/*.test.js", "!lib/**/index.js", "lib/**/*.js"],
    tests: ["lib/**/*.test.js"],
    env: {
      type: "node",
      runner: "node"
    }
  };
};
