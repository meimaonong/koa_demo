'use strict';

const BaseController = require('./../components/BaseController')
const Bluebird = require('bluebird')
const fs = Bluebird.promisifyAll(require('fs'))
const moment = require('moment')
const mkdirp = require('mkdirp')
const UUID = require('uuid')

const { promisify } = require('util')
const sizeOf = promisify(require('image-size'))

// const gm = require('gm').subClass({ imageMagick: true })
const sharp = require('sharp')


const Dir = require('./../config/dir.conf')

class FileController extends BaseController {

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
  async actionImageUpload() {

    const that = this

    // 获取参数
    that.getRequestData()
    
    // 上传文件: name = file
    const data = this.requestData.files.file

    // 图片保存目录
    const uploads_dir = `${Dir.uploads}/x/images/${moment().format('YYYY')}/${moment().format('MM')}/${moment().format('DD')}`

    // 创建目录，目录存在则不做任何操作
    if (!fs.existsSync(uploads_dir)) {
      console.log('create')
      mkdirp.sync(uploads_dir, {}, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
      })
    }
    
    // 扩展名
    const ext = data.name.substr( data.name.lastIndexOf(".") + 1 )
    // 文件名
    const fileName = `${UUID.v1().replace(/-/g, "")}.${ext}`
    // 文件保存路径
    const saveFile = `${uploads_dir}/${fileName}`

    // 保存文件
    const reader = fs.createReadStream(data.path)
    const stream = fs.createWriteStream(saveFile)
    reader.pipe(stream)
    stream.on('finish', async () => {
      try {
        const dimensions = await sizeOf(saveFile)
        console.log(dimensions.width, dimensions.height)
        
      } catch (err) {
        console.error(err);
      }
    });

    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 3000);
    // })
    
    that.ctx.body = { status: 200 } 

    // 创建目录，目录存在则不做任何操作
    /* if (!fs.existsSync(`${uploads_dir}/w240h240`)) {
      console.log('create two')
      mkdirp.sync(`${uploads_dir}/w240h240`, {}, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
      })
    } */

    // console.log(saveFile, `${uploads_dir}/w240h240/${fileName}`)

    // var readStream = fs.createReadStream(saveFile)

    // const resizeFile = `${uploads_dir}/w240h240/${fileName}`
    

    /* sharp(saveFile)
      .resize(150, 150)
      .quality(100)
      .toFile(resizeFile, function (err) {
        if (err) {
          console.log(err)
        } else {
          // console.log('Completed!')
        }
        
        
      }) */

    

  }

}

module.exports = FileController;