const controller = require('./pl-controller')

const Dir = require('./../config/dir.conf')

module.exports = (app, router) => {

  // controller初始化插件
  controller(
    router,
    { controllers_dir: Dir.controllers_dir }
  )

}