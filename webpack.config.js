let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const DIST_PATH = path.resolve(__dirname, 'dist');
const dev_mode = process.env.NODE_ENV !== 'production';
/**
 * Entry
 */
let entry = {
  app: ['./src/index.tsx'],
}

/**
 * Output
 */
let output = {
  path: DIST_PATH,
  filename: 'app.min.js',
  sourceMapFilename: 'app_map.min.js.map'
}

let ts_rule = {
  test: /\.(ts|tsx)?$/,
  use: ['awesome-typescript-loader'],
  exclude: /node_modules/,
};

let plugins = [
  new CheckerPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  })
];

let devtool = 'hidden-source-map';

/**
 *Deal with dev_mode
 */
if (dev_mode) {
  entry.app.push(...[
    'webpack-hot-middleware/client?reload=true',
  ]);

  output.publicPath = '/';

  ts_rule.use.splice(0, 0, 'react-hot-loader');

  plugins.push(...[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]);

  devtool = 'eval-source-map';
}

/**
 * Assemble the config
 */
let webpack_config = {
  entry,
  output,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        use: 'source-map-loader',
        exclude: /node_modules/,
      },
      ts_rule,
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[path][name]_[hash].[ext]'
          }
        }],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool,
  context: __dirname,
  plugins,
};

module.exports = webpack_config;
