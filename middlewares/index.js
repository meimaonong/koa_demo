const path = require('path')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const nunjucks = require('koa-nunjucks-2')
const json = require('koa-json')
const staticFiles = require('koa-static')
const axios = require('axios')

const Dir = require('./../config/dir.conf')

module.exports = (app, router) => {

  // 静态目录
  app.use(staticFiles(Dir.public))

  // nunjucks渲染
  app.use(nunjucks({
    ext: 'html',
    path: Dir.views_dir, // 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义 防Xss
    }
  }))

  // bodyParser
  // app.use(bodyParser())

  // koa-body
  app.use(koaBody({ multipart: true }))

  // json
  app.use(json())

  // 调用路由中间件
  app
    .use(router.routes())
    .use(router.allowedMethods())

}