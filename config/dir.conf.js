const path = require('path')

const root = path.join(__dirname, './../')

// 项目路径配置
module.exports = {
  root, // 根路径
  app: path.join(root, 'app'), // app 路径
  public: path.join(root, 'public'), // 静态文件路径
  dist: path.join(root, 'public/dist'), // 前端文件版本
  static: path.join(root, 'public/dist/static'), // 静态文件图片、字体
  src: path.join(root, 'app/src'), // webpack src路径
  wp_service: path.join(root, 'app/src/services'), // webpack service路径
  tpl: path.join(root, 'app/src/tpl'), // webpack src路径
  wp_view: path.join(root, 'app/src/views'), // webpack view路径
  wp_page: path.join(root, 'app/src/views/pages'), // webpack page路径
  views_dir: path.join(root, 'views'),  // nunjucks模板路径
  controllers_dir: path.join(root, 'controllers'),  // controllers路径
  components_dir: path.join(root, 'components'),  // components路径
}
