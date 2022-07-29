const baseConfig = require('./ava.base.config');

module.exports = Object.assign({}, baseConfig, {
  files: ['test/**/*.spec.ts'],
  concurrency: 1,
  failFast: true,
  failWithoutAssertions: true,
  timeout: '30s',
});
