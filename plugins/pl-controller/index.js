const requireAll = require('require-all')

module.exports = (router, options) => {

  const controllers_dir = options.controllers_dir

  const bootControllers = {}

  let controllers = requireAll({
    dirname: controllers_dir,
    filter: /(.+Controller)\.mjs$/,
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

}