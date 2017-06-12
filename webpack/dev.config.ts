import * as webpack from 'webpack';

export const cfg_dev:webpack.Configuration = {
  entry: {
    app: ['webpack-hot-middleware/client?reload=true'],
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
