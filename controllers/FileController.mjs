'use strict';

const BaseController = require('./../components/BaseController')

const Utils = require('./../components/utils')
const Bluebird = require('bluebird')
const fs = Bluebird.promisifyAll(require('fs'))
const moment = require('moment')
// const mkdirp = require('mkdirp')
const UUID = require('uuid')

const { promisify } = require('util')
const sizeOf = promisify(require('image-size'))

// const gm = require('gm').subClass({ imageMagick: true })
const sharp = require('sharp')

// 目录配置
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
   * 获取图片尺寸
   * @param stream 
   * @param saveFile 
   */
  getImageDimensions(stream, saveFile) {
    return new Promise(function (resolve, reject) {
      stream.on('finish', async () => {
        try {
          const dimensions = await sizeOf(saveFile)
          console.log(dimensions.width, dimensions.height)
          resolve(dimensions)
        } catch (err) {
          console.error(err)
          reject(err)
        }
      })
    })
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
    Utils.creatFolder(uploads_dir)
    // if (!fs.existsSync(uploads_dir)) {
    //   console.log('create')
    //   mkdirp.sync(uploads_dir, {}, function (err) {
    //     if (err) console.error(err)
    //     else console.log('pow!')
    //   })
    // }
    
    // 扩展名
    const ext = data.name.substr( data.name.lastIndexOf(".") + 1 )
    // 文件名
    const fileName = `${UUID.v1().replace(/-/g, "")}.${ext}`
    // 文件保存路径
    const saveFile = `${uploads_dir}/${fileName}`

    

    // 保存文件
    const reader = fs.createReadStream(data.path)
    const stream = fs.createWriteStream(saveFile)
    
    /*
    stream.on('finish', async () => {
      try {
        const dimensions = await sizeOf(saveFile)
        console.log(dimensions.width, dimensions.height)
         
      } catch (err) {
        console.error(err);
      }
    })
    */


    reader.pipe(stream)

    const dimensions = await this.getImageDimensions(stream, saveFile)

    // await this.sleep(3000)
    // await Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 3000)
    // })
    // (function(){console.log('now')})(); 
    
 
    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 3000);
    // })
    // await this.sleep(1000)
    
    // that.ctx.body = { status: 200 } 

    // 创建目录，目录存在则不做任何操作
    Utils.creatFolder(`${uploads_dir}/w240h240`)
    // if (!fs.existsSync(`${uploads_dir}/w240h240`)) {
    //   console.log('create two')
    //   mkdirp.sync(`${uploads_dir}/w240h240`, {}, function (err) {
    //     if (err) console.error(err)
    //     else console.log('pow!')
    //   })
    // }

    // console.log(saveFile, `${uploads_dir}/w240h240/${fileName}`)

    // var readStream = fs.createReadStream(saveFile)

    const resizeFile = `${uploads_dir}/w240h240/${fileName}`
    

    sharp(saveFile)
      .resize(150, 150)
      .toFile(resizeFile, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Completed!')
        }
      })

      console.log('end', dimensions)
      that.ctx.body = { status: 200 } 

  }

}

module.exports = FileController;