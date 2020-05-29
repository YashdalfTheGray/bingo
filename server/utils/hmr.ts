import webpack from 'webpack';
import express from 'express';

type WebpackConfigFunction = (
  env: any,
  args: webpack.CliConfigOptions
) => webpack.Configuration;

type WebpackModeType = 'none' | 'development' | 'production';

type WebpackConfigAndCompiler = {
  config: webpack.Configuration;
  compiler: webpack.Compiler;
};

export default function hotModuleReloadingSetup(
  app: express.Application
): WebpackConfigAndCompiler {
  const webpackConfigFunction: WebpackConfigFunction = require('../../webpack.config.js');

  const mode: WebpackModeType = process.env.NODE_ENV as WebpackModeType;

  const config = webpackConfigFunction(null, { mode });
  const compiler = webpack(config);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output!.publicPath,
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));

  return { config, compiler };
}
