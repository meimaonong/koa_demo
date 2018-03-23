const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')
const json = require('koa-json')
const staticFiles = require('koa-static')
const axios = require('axios')
const ip = require('ip')

// 系统配置
const Sys = require('./config/sys')

const app = new Koa()

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")))

app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),// 指定视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}))

app.use(bodyParser())
app.use(json())


router.post('/ajax/route', async (ctx, next) => {
    ctx.body = { foo: 'bar' }
})

// 调用路由中间件
app.use(router.routes())

app.listen(Sys.SERVER_PORT, () => {
    console.log(`server is running on ${Sys.SERVER_PORT}`)
})