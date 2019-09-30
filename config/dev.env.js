'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE: '"/api"',
  SERVER_GO: '"/go"',
  SERVER_JAVA: '"/java"'
})
