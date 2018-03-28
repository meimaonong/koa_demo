const Koa = require('koa')
const router = require('koa-router')()
// const bodyParser = require('koa-bodyparser')
// const nunjucks = require('koa-nunjucks-2')
// const path = require('path')
// const json = require('koa-json')
// const staticFiles = require('koa-static')
// const axios = require('axios')

// const requireAll = require('require-all')

// 系统配置
const Sys = require('./config/sys.conf')

const plugins = require('./plugins')
const middleware = require('./middlewares')

const app = new Koa()

// 插件
plugins(app, router)
// 中间件
middleware(app, router)

// // 指定 public目录为静态资源目录，用来存放 js css images 等
// app.use(staticFiles(path.resolve(__dirname, "./public")))

// app.use(nunjucks({
//     ext: 'html',
//     path: path.join(__dirname, 'views'),// 指定视图目录
//     nunjucksConfig: {
//         trimBlocks: true // 开启转义 防Xss
//     }
// }))

// app.use(bodyParser())
// app.use(json())

/* const bootControllers = {}

let controllers = requireAll({
    dirname: __dirname + '/controllers',
    filter: /(.+Controller)\.js$/,
})

for (let key in controllers) {
    const controller = controllers[key]

    const preClassName = controller.name
    let className = controller.name
    className = className.replace('Controller', '')
    className = className.substring(0, 1).toLowerCase() + className.substring(1)
    className = className.replace(/([A-Z])/g, "-$1").toLowerCase()

    const actions = Object.getOwnPropertyNames(controller.prototype)

    actions.forEach((actionName) => {

        if (actionName.indexOf('action') === 0) {
            const preActionName = actionName
            actionName = actionName.replace('action', '')
            actionName = actionName.substring(0, 1).toLowerCase() + actionName.substring(1)
            actionName = actionName.replace(/([A-Z])/g, "-$1").toLowerCase()
            const routeName = `/${className}/${actionName}`

            // get method
            router.get(routeName, async (ctx, next) => {

                let currentObj = bootControllers[preClassName]

                currentObj ?
                    Object.assign(currentObj, { ctx, next })
                    : currentObj = new controller({ ctx, next })

                await currentObj[preActionName]()
                
            })

            // post method
            router.post(routeName, async (ctx, next) => {

                let currentObj = bootControllers[preClassName]

                currentObj ? 
                  Object.assign(currentObj, { ctx, next }) 
                  : currentObj = new controller({ ctx, next })

                await currentObj[preActionName]()

            })

        }

    })


    
}
 */

// // 调用路由中间件
// app.use(router.routes())

app.listen(Sys.SERVER_PORT, () => {
    console.log(`server is running on ${Sys.SERVER_PORT}`)
})