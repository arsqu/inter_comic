'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"xulin"',
  OUT_PUT: '"Xulinad"',
  PRO_DIFF: {
    title: "Manga"
  },
  APP_DOWN: false,
  API_BASE: '"/api"',
  SERVER_GO: '"/go"',
  SERVER_JAVA: '"/java"'
})