import * as path from 'path';
import * as webpack from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as  HtmlWebpackPlugin from 'html-webpack-plugin';
import * as LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

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
            name: 'asset/[name]_[hash:3].[ext]',
            limit: 8192,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: true,
    }),
  ],
};
