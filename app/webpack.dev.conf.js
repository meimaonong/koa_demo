var webpack = require('webpack')
var merge = require('webpack-merge')

// 目录配置
const Dir = require('./../config/dir.conf')

var baseWebpackConfig = require(`${Dir.app}/webpack.base.conf`)

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DllReferencePlugin({
            context: Dir.root,
            manifest: require(`${Dir.dist}/vendor_dev/vendor-manifest-dev.json`)
        })
    ],
    devtool: '#eval-source-map'
})
