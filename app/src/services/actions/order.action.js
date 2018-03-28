import * as Route from '../params/order.param'

// 获取订单列表
const getBossOrderlist = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.GET_BOSS_ORDERLIST, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

// 发货
const send = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.SEND, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

// 完成收货
const receive = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.RECEIVE, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

export {
  getBossOrderlist,
  send,
  receive,
}