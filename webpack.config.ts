import * as merge from 'webpack-merge';
import { cfg_common } from './webpack/common.config';
import { cfg_dev } from './webpack/dev.config';
import { cfg_prod } from './webpack/prod.config';

interface ENV {

}

export function get_webpack_config(env?:Partial<ENV>) {
  if (process.env.NODE_ENV === 'production') {
    console.log('Using Production Config in Webpack.')
    return merge(cfg_common, cfg_prod);
  }
  return merge(cfg_common, cfg_dev);
}

export default get_webpack_config;