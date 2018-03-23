'use strict';

const BaseController = require('./../components/BaseController')

class UserController extends BaseController {

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
    console.log('user index')
  }

  /**
   * 404
   */
  async actionInfo() {

  }

}

module.exports = UserController;