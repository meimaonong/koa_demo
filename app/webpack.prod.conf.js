const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 目录配置
const Dir = require('./../config/dir.conf')

var CleanWebpackPlugin = require('clean-webpack-plugin')
var baseWebpackConfig = require(`${Dir.app}/webpack.base.conf`)
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new CleanWebpackPlugin(
      [
        `${Dir.dist}/res`,
        `${Dir.controllers_dir}`
      ], 
      {
        root: Dir.root,
        exclude: ['SiteController.mjs', 'AjaxController.mjs', 'FileController.mjs'],
        verbose: true,
        dry: false
      }
    ),
    new webpack.DllReferencePlugin({
      context: Dir.root,
      manifest: require(`${Dir.dist}/vendor/vendor-manifest.json`)
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  devtool: '#source-map'
})