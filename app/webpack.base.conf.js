var path = require('path')
var webpack = require('webpack')
var ip = require('ip')
var WebpackNotifierPlugin = require('webpack-notifier')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 系统配置
const Sys = require('./../config/sys.conf')

// 目录配置
const Dir = require('./../config/dir.conf')

//环境标识
const isProd = process.env.NODE_ENV === 'production' ? true : false

//入口文件列表
let newEntries = glob.sync(`${Dir.wp_page}/*/main.js`)
let entryArr = {}
newEntries.forEach(function (f) {
  let tArr = f.split('/')
  let name = tArr[tArr.length - 2]
  entryArr[name] = f
})
let entryKeys = Object.keys(entryArr)
let chunksArr = [], pluginsList = []

entryKeys.map(function (key) {
  chunksArr = ['common', key]
  if (isProd) {
    viewUrl = `${Dir.views_dir}/${key}/index.html`
  } else {
    key === 'index' ? viewUrl = 'index.html' : viewUrl = `${key}/index.html`
  }

  // html
  pluginsList.push(
    new HtmlWebpackPlugin({
      title: '',
      filename: viewUrl,
      template: `${Dir.tpl}/main.tpl.html`,
      hash: false,
      chunks: chunksArr
    })
  )

  if (isProd) {
    tplViewUrl = `${Dir.controllers_dir}/` + key.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) + 'Controller.mjs'
    // php action
    pluginsList.push(
      new HtmlWebpackPlugin({
        title: key,
        filename: tplViewUrl,
        template: `${Dir.tpl}/controller.tpl`,
        hash: false,
        chunks: []
      })
    )
  }
  
})

module.exports = {
  entry: entryArr,
  output: {
    path: isProd ? Dir.dist : Dir.root,
    publicPath: '/',
    filename: isProd ? 'res/[name]/build.[chunkhash:8].js?' : '[name]/build.[hash:8].js?',
    chunkFilename: isProd ? 'res/[name].[chunkhash:8].js?' : '[name].[hash:8].js?'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: `${Dir.static}/[path]/[name].[hash:8].[ext]`
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: `${Dir.static}/[path]/[name].[hash:8].[ext]`
        }
      }
    ]
  },
  plugins: [
    ...pluginsList,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: isProd ? 'res/[name]/build.[chunkhash:8].js' : '[name]/build.[hash:8].js',
    }),
    new WebpackNotifierPlugin(),
    new webpack.ProvidePlugin({
      Vue: ['vue', 'default'],
      VueRouter: ['vue-router', 'default'],
      VueResource: ['vue-resource', 'default'],
      Vuex: ['vuex', 'default'],

      ElementUI: 'element-ui',

      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ],
  resolve: {
    alias: {
      //'vue$': 'vue/dist/vue.esm.js'
      'services': Dir.wp_service,
    },
    extensions: ['.js', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: Sys.DEV_PORT,
    host: ip.address(),
    proxy: {
      '/public': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      },
      '/file': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      },
      '/cdn': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      },
      '/dist': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      },
      '/output': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      },
      '/ajax': {
        target: 'http://' + ip.address() + ':' + Sys.SERVER_PORT,
        changeOrigin: true,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  }
}
