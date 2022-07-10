const baseConfig = require('./ava.base.config');

module.exports = Object.assign({}, baseConfig, {
  files: ['client/**/*.spec.ts', 'common/**/*.spec.ts', 'server/**/*.spec.ts'],
});
