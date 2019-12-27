const fse = require('fs-extra');
const path = require('path');
const PictureBed = require('../src/index');
const util = require('../src/util/index');

const pictureBed = new PictureBed();

const extnameMap = ['BMP', 'JPEG', 'GIF', 'PSD', 'PNG', 'TIFF', 'TGA', 'EPS', 'SVG', 'webP', 'CDR', 'PCX', 'EXIF', 'FPX', 'PCD', 'DXF', 'UFO', 'AI', 'HDRI', 'RAW', 'WMF', 'FLIC', 'EMF', 'ICO'];


module.exports = {
  // 初始化环境
  init(options) {
    pictureBed.initLocal(options.init);
  },
  // 升级版本
  update() {
    util.update();
  },
  // 添加新文件
  addFile(options) {
    if (options.path) {
      if (fse.existsSync(options.path)) {
        const extname = path.extname(options.path);
        if (path.extname) {
          const ext = extname.replace('.', '');
          if (extnameMap.includes(ext.toUpperCase())) {
            const status = pictureBed.addImage(options.path);
          } else {
            console.log(`不支持当前格式${path.extname} 文件`);
          }
        }
      } else {
        console.log('当前路径不存在图片文件');
      }
    }
  }
}