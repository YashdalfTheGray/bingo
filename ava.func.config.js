const baseConfig = require('./ava.base.config');

module.exports = Object.assign({}, baseConfig, {
  files: ['test/**/*.spec.ts'],
  concurrency: 2,
  failFast: true,
  failWithoutAssertions: true,
});
