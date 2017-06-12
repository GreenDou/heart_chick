import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';

import { get_webpack_config } from '../webpack.config';

const wb_cfg = get_webpack_config();
const compiler = webpack(wb_cfg);

export const app = new Koa();
const router = new Router();
const PATH_DIST = path.join(__dirname, '..', 'dist');


if (process.env.NODE_ENV !== 'production') {
  app.use(require('koa-webpack-dev-middleware')(
    compiler,
    {
      publicPath: wb_cfg.output ? wb_cfg.output.publicPath : '/',
    }));
  app.use(require('koa-webpack-hot-middleware')(compiler));
}

app.use(router.routes());
app.use(serve(PATH_DIST));
