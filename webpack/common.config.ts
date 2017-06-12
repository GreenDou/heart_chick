import * as path from 'path';
import * as webpack from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as  HtmlWebpackPlugin from 'html-webpack-plugin';

const PATH_ROOT = path.resolve(__dirname, '..');
const PATH_DIST = path.resolve(PATH_ROOT, 'dist');

export const cfg_common:webpack.Configuration = {
  entry: {
    app: ['./src/index.tsx'],
  },
  output: {
    path: PATH_DIST,
    publicPath: '/',
    filename: 'app.min.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)?$/,
        use: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
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
  context: PATH_ROOT,
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PATH_ROOT, 'src/index.html'),
    }),
  ],
};
