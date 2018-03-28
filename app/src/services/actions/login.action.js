import * as Route from '../params/login.param'

// 登录
const login = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.LOGIN, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

export {
  login,
}