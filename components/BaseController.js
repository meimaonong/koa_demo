'use strict';

const axios = require('axios')
const Api = require('./../config/api.conf')

class BaseController{

  constructor(args) {

    // httpClient
    this.httpClient = axios.create({
      headers: { 'Content-Type': 'application/json' }
    })

    // 请求对象requestData
    this.requestData = {}

    Object.assign(this, args)
  }

  // 确定请求路径
  setRoute(mode) {

    const that = this
    let api = ''

    if (mode) {
      // 当用不同的api路径时启用
      api = Api.API_URL_SERVER
    } else {
      api = that.ctx.request.header['host'] && Api.API_REQUEST_HOST_SERVER.indexOf(that.ctx.request.header['host']) > -1 ? Api.API_URL_SERVER : Api.API_URL_DEV
    }

    this.httpClient.defaults.baseURL = api
    
  }

  // 设置头部
  setHeader() {
    const that = this
    that.httpClient.defaults.headers.common['access-token'] = that.ctx.request.header['access-token'] ? that.ctx.request.header['access-token'] : ''
  }

  // 获取请求数据
  getRequestData() {
    const that = this
    that.requestData = Object.assign({}, that.ctx.request.query, that.ctx.request.body)
  }

  // httpGet
  httpGet(apiAction, params = {}, callback = (res) => {}) {

    const that = this

    that.setHeader()
    that.setRoute(params['mode'])

    delete params['mode']

    return new Promise((resolve, reject) => {
      that.httpClient.get(apiAction, params)
      .then((response) => {
        callback(response.data)
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
    })

  }

  // httpPost
  httpPost(apiAction, params = {}, callback = (res) => {}) {

    const that = this

    that.setHeader()
    that.setRoute(params['mode'])

    delete params['mode']

    return new Promise((resolve, reject) => {
      that.httpClient.post(apiAction, params)
        .then((response) => {
          callback(response.data)
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })

  }


}


module.exports = BaseController;