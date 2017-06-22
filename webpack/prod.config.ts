import * as webpack from 'webpack';
import * as CompressionPlugin from 'compression-webpack-plugin';

export const cfg_prod:webpack.Configuration = {
  devtool: 'hidden-source-map',
  plugins: [
    new (webpack.optimize as any).ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: true,
      compress: true,
      comments: false,
    }),
    new CompressionPlugin(),
  ],
};
