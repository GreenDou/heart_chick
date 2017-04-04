let Koa = require('koa');
let Router = require('koa-router');
let path = require('path');
let fs = require('fs');
const webpack = require('webpack');
const serve = require('koa-static');

const webpack_config = require('../webpack.config.js');

const compiler = webpack(webpack_config);
const app = new Koa();
const router = new Router();
const dist_path = path.join(__dirname, '..', 'dist');


if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV);
  app.use(require('koa-webpack-dev-middleware')(compiler, {
    publicPath: webpack_config.output.publicPath,
  }));
  app.use(require('koa-webpack-hot-middleware')(compiler));
}

app.use(router.routes());
app.use(serve(dist_path));
module.exports = app;
