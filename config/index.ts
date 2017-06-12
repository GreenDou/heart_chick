import * as  _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

// A > B means A overrides B 
// file at env let path > local.json > default.json
// json files are taken from the config directory (where this file is located)

const CFG_DIR = path.join(__dirname);
const CFG_ENV_VAR = 'HEART_CHICK_CFG';

export interface ConfigJSON {
  both:{};
  client:{};
  server:ServerConfig;
}

export interface Config {
  server:ServerConfig;
  client:{};
}

export interface ServerConfig {
  port:number;
}

let generated_cfg:Config;

export function config() {
  if (!generated_cfg) {
    generated_cfg = generate_cfg();
  }
  return generated_cfg;
}

function generate_cfg() {
  let default_config_path = path.join(CFG_DIR, 'default.json');
  let local_config_path = path.join(CFG_DIR, 'local.json');

  let local_config:Partial<ConfigJSON>|undefined;
  if (file_exists(local_config_path)) {
    local_config = require(local_config_path);
  }

  let env_config:Partial<ConfigJSON>|undefined;
  if (_.has(process.env, CFG_ENV_VAR)) {
    let env_cfg_path = process.env[CFG_ENV_VAR];
    if (file_exists(env_cfg_path)) {
      env_config = require(env_cfg_path);
    } else {
      throw ("\nConfiguration file specified by env let " + CFG_ENV_VAR + " = " + env_cfg_path + " does not exist.\n");
    }
  }

  let default_config = require(default_config_path);
  let mixed_config = _.defaultsDeep<ConfigJSON|{}, ConfigJSON>(
    {}, // apply modifications to this new dict
    env_config,
    local_config,
    default_config); // ensure all necessary sub-dicts exist

  return separate_client_server(mixed_config);
}

function separate_client_server(mixed_config:ConfigJSON) {
  let client_config = _.defaultsDeep({}, mixed_config.client, mixed_config.both);
  let server_config = _.defaultsDeep<ServerConfig|{}, ServerConfig>({}, mixed_config.server, mixed_config.both);

  return {
    client: client_config,
    server: server_config
  };
}

function file_exists(path:string) {
  try {
    // fs.lstatSync(path)
    return true;
  } catch (e) {
    return false;
  }
}
