import * as Route from '../params/account.param'

// 添加boss用户
const addBossUser = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.ADD_BOSS_USER, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

// 重设boss用户密码
const changePassword = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.CHANGE_PASSWORD, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

export {
  addBossUser,
  changePassword,
}