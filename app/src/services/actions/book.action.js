import * as Route from '../params/book.param'

// 获取订单列表
const getBossBooklist = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.GET_BOSS_BOOKLIST, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

// 获取书籍详情
const getBook = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.GET_BOOK, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

// 保存
const saveBook = (params = {}, callback) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(Route.SAVE_BOOK, params).then((response) => {
        callback(response.body)
        resolve()
    })
  })
}

export {
  getBossBooklist,
  getBook,
  saveBook,
}