'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"manga"',
  OUT_PUT: '"Mangaline"',
  PRO_DIFF: {
    title: "Mangaline"
  },
  API_BASE: '"/api"',
  APP_DOWN: true,
  SERVER_GO: '"/go"',
  SERVER_JAVA: '"/java"'
})
