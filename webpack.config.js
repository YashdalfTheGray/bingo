const path = require('path');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = (mode) => mode === 'development';
const isProd = (mode) => mode === 'production';

module.exports = (_, argv) => ({
  entry: [
    ...(isDev(argv.mode) ? ['webpack-hot-middleware/client'] : []),
    './client/index.ts',
    './client/index.scss',
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js',
  },
  mode: argv.mode,
  devtool: isDev(argv.mode) ? 'source-map' : 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.client.json',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev(argv.mode),
            },
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [autoprefixer()].concat(
                  isProd(argv.mode) ? [cssnano()] : []
                ),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@bingo/common': path.resolve(__dirname, './common'),
      '@bingo/components': path.resolve(__dirname, './client/components'),
      '@bingo/client': path.resolve(__dirname, './client'),
    },
    extensions: ['.ts', '.js', '.css'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin({
      verbose: isDev(argv.mode),
      cleanOnceBeforeBuildPatterns: ['artifacts', '*.gz', '*.js', '*.css'],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: argv.mode,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  stats: {
    colors: true,
  },
});
