import * as merge from 'webpack-merge';
import { cfg_common } from './webpack/common.config';
import { cfg_dev } from './webpack/dev.config';
import * as cfg_prod from './webpack/prod.config';

interface ENV {

}

export function get_webpack_config(env?:Partial<ENV>) {
  if (process.env === 'production') {
    return merge(cfg_common, cfg_prod);
  }
  console.log(cfg_common, cfg_dev)
  return merge(cfg_common, cfg_dev);
}

export default get_webpack_config;