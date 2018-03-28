'use strict';

const BaseController = require('./../components/BaseController')

class AjaxController extends BaseController {

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
  async actionRoute() {
    const that = this
    // 获取参数
    that.getRequestData()
    
    // 获取接口
    const apiAction = that.requestData['func']
    // 删除接口在对象中的属性 
    delete that.requestData['func']

    const res = await that.httpPost(apiAction, that.requestData)

    that.ctx.body = res

  }

}

module.exports = AjaxController;