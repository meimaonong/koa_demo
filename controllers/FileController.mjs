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
   * 生成缩略图
   */
  createPics_1(saveFile, uploads_dir, fileName) {
    // 尺寸项
    const sizeList = [1280, 1080, 800, 600, 400, 200]
    let count = 0

    return new Promise((resolve, reject)=>{
      // 生成对应尺寸图片
      sizeList.forEach((item) => {

        const resizeDir = `${uploads_dir}/w${item}`
        const resizeFile = `${resizeDir}/${fileName}`
        Utils.creatFolder(resizeDir)

        sharp(saveFile)
        .resize(item, null)
        .toFile(resizeFile, function (err) {
          if (err) {
            console.log(err)
          } else {
            // console.log('Completed!')
          }
          count++
          if (count == sizeList.length) {
            resolve()
          }
        })

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

    // 获取图片尺寸
    const dimensions = await this.getImageDimensions(stream, saveFile)

    // 生成所缩略图
    await this.createPics_1(saveFile, uploads_dir, fileName)

    that.ctx.body = { 
      code: 0,
      data: {
        img_name: fileName,
        img_url: uploads_dir.replace(Dir.root, '') + '/',
        img_width: dimensions.width,
        img_height: dimensions.height,
        img_ratio: Number((dimensions.width / dimensions.height).toFixed(2)),
      },
      msg: 'File uploaded with success',
    } 

  }

}

module.exports = FileController;