const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')

// 目录配置
const Dir = require('./../config/dir.conf')

let vArr = ['vue', 'vue-router', 'vue-resource', 'vuex', 'jquery', 'element-ui']

if (process.env.NODE_ENV === 'production') {

    module.exports = {
      entry: {
        vendor: vArr
      },
      output: {
        path: Dir.dist,
        publicPath: '/',
        filename: '[name]/vendor.dll.[chunkhash:8].js',
        library: '[name]'
      },
      plugins: [
        new CleanWebpackPlugin(
          [
            `${Dir.dist}/vendor`
          ], 
          {
            root: Dir.root,
            verbose: true,
            dry: false
          }
        ),
        /* new ManifestPlugin({
          fileName: `${Dir.app}/dll.manifest.json`
        }), */
        new HtmlWebpackPlugin({
          filename: `${Dir.tpl}/vendor.html`,
          templateContent: '',
          chunks: ['vendor']
        }),
        new webpack.DllPlugin({
          path: `${Dir.dist}/[name]/vendor-manifest.json`,
          name: '[name]'
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: false
          }
        })
      ]
    };

} else {
   module.exports = {
     entry: {
       vendor: vArr
     },
     output: {
       path: Dir.dist,
       publicPath: '/dist/',
       filename: '[name]_dev/vendor.dll.dev.[hash:8].js',
       library: '[name]'
     },
     plugins: [
       new CleanWebpackPlugin(
         [
           `${Dir.dist}/vendor_dev`
         ],
         {
           root: Dir.root,
           verbose: true,
           dry: false
         }
       ),
       /* new ManifestPlugin({
         fileName: `${Dir.app}/dll.dev.manifest.json`
       }), */
       new HtmlWebpackPlugin({
         filename: `${Dir.tpl}/vendor-dev.html`,
         templateContent: '',
         chunks: ['vendor']
       }),
       new webpack.DllPlugin({
         path: `${Dir.dist}/[name]_dev/vendor-manifest-dev.json`,
         name: '[name]'
       })
     ]
   };
}