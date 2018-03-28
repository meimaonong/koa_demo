const fs = require('fs')
const mkdirp = require('mkdirp')

/**
 * 创建文件夹
 * @param {文件夹路径} dir 
 */
const creatFolder = (dir) => {
  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir, {}, function (err) {
      if (err) {
        console.error(err)
      } else {
        // console.log('done')
      }
    })
  }
}

module.exports = {
  creatFolder
}