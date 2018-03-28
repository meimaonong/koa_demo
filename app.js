const Koa = require('koa')
const router = require('koa-router')()

// 系统配置
const Sys = require('./config/sys.conf')

const plugins = require('./plugins')
const middleware = require('./middlewares')

const app = new Koa()

// 插件
plugins(app, router)
// 中间件
middleware(app, router)

// 启动
app.listen(Sys.SERVER_PORT, () => {
    console.log(`server is running on ${Sys.SERVER_PORT}`)
})