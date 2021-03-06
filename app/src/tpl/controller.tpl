'use strict';

const BaseController = require('./../components/BaseController')

class <%= htmlWebpackPlugin.options.title.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) %>Controller extends BaseController {

  /**
   * 构造函数
   * @param {初始化传参} args 
   */
  constructor(args) {
    super(args)
  }

  /**
   * 首页
   */
  async actionIndex() {
    await this.ctx.render('site/index')
  }

}

module.exports = <%= htmlWebpackPlugin.options.title.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()) %>Controller;