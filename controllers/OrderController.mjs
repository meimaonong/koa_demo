'use strict';

const BaseController = require('./../components/BaseController')

class OrderController extends BaseController {

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

module.exports = OrderController;