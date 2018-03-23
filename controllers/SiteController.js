'use strict';

const BaseController = require('./../components/BaseController')

class SiteController extends BaseController {

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
    // this.ctx.body = {name: 'hello world'}
    await this.ctx.render('site/index', {
      btnName: 'GoGoGo'
    })
  }

  /**
   * 404
   */
  async actionError() {

  }

}

module.exports = SiteController;