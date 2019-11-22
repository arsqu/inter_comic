'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_VERSION: '0.1',
  API_BASE: '"/api"',
  SERVER_GO: '"/go"',
  SERVER_JAVA: '"/java"'
})
