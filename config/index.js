"use strict";

let _ = require('lodash');
let fs = require('fs');
let path = require('path');

// A > B means A overrides B 
// file at env let path > local.json > default.json
// json files are taken from the config directory (where this file is located)

let cfg_dir = path.join(__dirname);
let cfg_env_var = 'BAMBOO_CFG';

let empty_config = {
  both: {},
  server: {},
  client: {}
};

let generated_cfg = null;

function config() {
  if (!generated_cfg) {
    generated_cfg = generate_cfg();
  }
  return generated_cfg;
}

function generate_cfg() {
  let default_config_path = path.join(cfg_dir, 'default.json');
  let local_config_path = path.join(cfg_dir, 'local.json');

  let local_config = {};
  if (file_exists(local_config_path)) {
    local_config = require(local_config_path);
  }

  let env_config = {};
  if (_.has(process.env, cfg_env_var)) {
    let env_cfg_path = process.env[cfg_env_var];
    if (file_exists(env_cfg_path)) {
      env_config = require(env_cfg_path);
    } else {
      console.error("\nConfiguration file specified by env let " + cfg_env_var + " = " + env_cfg_path + " does not exist.\n");
      return null;
    }
  }

  let default_config = require(default_config_path);
  let mixed_config = _.defaultsDeep(
    {}, // apply modifications to this new dict
    env_config,
    local_config,
    default_config,
    empty_config); // ensure all necessary sub-dicts exist

  return separate_client_server(mixed_config);
}

function separate_client_server(mixed_config) {
  // TODO error if duplicate keys
  let client_config = _.defaultsDeep({}, mixed_config.client, mixed_config.both);
  let server_config = _.defaultsDeep({}, mixed_config.server, mixed_config.both);

  return {
    client: client_config,
    server: server_config
  };
}

function file_exists(path) {
  try {
    // fs.lstatSync(path)
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = config;
