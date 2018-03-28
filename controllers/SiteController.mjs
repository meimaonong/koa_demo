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
    let that = this

    /* await that.httpPost(
      'http://x.api.org/v1/book/get-book', 
      {
        "book_id": 5
      },
      (res) => {
        console.log('done')
        // that.ctx.body = res
        that.ctx.body = that.ctx.request.header
      }
    ) */
    
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