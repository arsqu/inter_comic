'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_VERSION: '0.2',
  API_BASE: '"/api"',
  ENV_CONFIG: '""',
  OUT_PUT: '""',
  APP_DOWN: 'true',
  SERVER_GO: '"/go"',
  SERVER_JAVA: '"/java"'
})
