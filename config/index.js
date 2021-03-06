'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const env = process.env.ENV_CONFIG

const proxyTable = {
  '/go': {
    target: 'http://192.168.31.25:86',//后端接口地址
    changeOrigin: true,//是否允许跨越
    pathRewrite: {
      '^/go': ''
    }
  },
  '/manga': {
    target: 'http://localhost:8874',
    changeOrigin: true,
    pathRewrite: {
      '^/manga': ''
    }
  },
  '/mangaCh': {
    target: 'http://localhost:8873',
    changeOrigin: true,
    pathRewrite: {
      '^/mangaCh': ''
    }
  },
  '/novel': {
    target: 'http://localhost:8875',
    changeOrigin: true,
    pathRewrite: {
      '^/novel': ''
    }
  }
}


module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable,
    // proxyTable: {
    //   '/go': {
    //     target: 'http://192.168.1.103:86',//后端接口地址
    //     changeOrigin: true,//是否允许跨越
    //     pathRewrite: {
    //       '^/go': ''
    //     }
    //   },
    //   '/java': {
    //     // target: 'http://localhost:8873',
    //     target: 'http://localhost:8875',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/java': ''
    //     }
    //   }
    // },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8055, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    // Template for index.html
    mangaEnv: require('./manga.env'),
    xulinEnv: require('./xulin.env'),
    pmangaEnv: require('./pmanga.env'),
    novelEnv: require('./novel.env'),
    index: path.resolve(__dirname, `../dist/${env}/index.html`),
    // Paths
    assetsRoot: path.resolve(__dirname, `../dist/${env}/`),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // productionGzip: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}