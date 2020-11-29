import webpack from 'webpack';
import express from 'express';

type WebpackConfigFunction = (
  env: any,
  args: webpack.Configuration
) => webpack.Configuration;

type WebpackModeType = 'none' | 'development' | 'production';

type WebpackConfigAndCompiler = {
  config: webpack.Configuration;
  compiler: webpack.Compiler;
};

/**
 * hotModuleReloadingSetup sets up the correct HMR middleware for
 * an express application. This supports both a functional webpack config
 * as well as a static webpack config.
 * @param app the express application to set up HMR for
 * @param configFilePath the webpack configuration file path
 * @returns the fully resolved webpack configuration as well as the compiler
 */
export default function hotModuleReloadingSetup(
  app: express.Application,
  configFilePath: string = '../../webpack.config.js'
): WebpackConfigAndCompiler {
  const mode: WebpackModeType = process.env.NODE_ENV as WebpackModeType;
  const config = getWebpackConfig(configFilePath, null, { mode });
  const compiler = webpack(config);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output!.publicPath,
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));

  return { config, compiler };
}

/**
 * getWebpackConfig supports extracting webpack configuration given a path
 * whether it resolves to a static configuration or a function that returns
 * a webpack configuration.
 *
 * By default, this function (in terms of typings), is expecting a function
 * that resolves into a config after passing in `args`. To type it properly for
 * a static config, use `getWebpackConfig<webpack.Configuration>(filePath);`
 * @param path the path of the config file to load
 * @param args the args to pass to the function if the config is in function form
 */
function getWebpackConfig<F = WebpackConfigFunction>(
  path: string,
  ...args: F extends WebpackConfigFunction ? Parameters<F> : never
): webpack.Configuration {
  const configOrFunction: F = require(path);

  if (typeof configOrFunction === 'function') {
    return configOrFunction.call(null, ...args);
  }
  return configOrFunction;
}
