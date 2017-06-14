import * as path from 'path';
import * as fs from 'fs';
import * as webpack from 'webpack';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import * as compress from 'koa-compress';

import { get_webpack_config } from '../webpack.config';

const wb_cfg = get_webpack_config();
const compiler = webpack(wb_cfg);
  console.log(compiler);
  console.log(compiler.outputFileSystem);

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
  router.get('/*', send_dev_index);
} else {
  router.get('/*', send_index);
  app.use(compress());
}

app.use(serve(PATH_DIST));
app.use(router.routes());

function send_index(ctx:Router.IRouterContext) {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(
    path.resolve(PATH_DIST, 'index.html'));
}

async function send_dev_index(ctx:Router.IRouterContext) {
  console.log('user get', ctx.request.url);
  const filename = path.join(PATH_DIST, 'index.html');

  await (new Promise(
    (resolve, reject) => {
      compiler.outputFileSystem.readFile(filename, (err:any, result:any) => {
        if (err) {
          reject(err)
        }
        ctx.response.type = 'html';
        ctx.response.body = result;
        resolve();
      })
    }));
}