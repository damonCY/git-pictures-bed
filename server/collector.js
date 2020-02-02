const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const Upload = require('../src/index');
const extnameMap = ['BMP', 'JPEG', 'JPG','GIF', 'PSD', 'PNG', 'TIFF', 'TGA', 'EPS', 'SVG', 'webP', 'CDR', 'PCX', 'EXIF', 'FPX', 'PCD', 'DXF', 'UFO', 'AI', 'HDRI', 'RAW', 'WMF', 'FLIC', 'EMF', 'ICO'];

class Collector extends Upload{
  constructor() {
    super();
    this.config = null;
  }

  init() {
    this.getConfig();
  }
  // 获取配置文件
  getConfig() {
    if (this.config) {
      return this.config;
    }
    const configPath = path.resolve(__dirname, '../upload.config.json');
    if (!fse.existsSync(configPath)) {
      return console.log(chalk.yellow('请先初始化项目：pb --init git@xxx'));
    }

    const configData = require(configPath);
    this.config = configData;
    return configData;
  }

  getImgDbData() {
    this.init()
    const repoPath = this.config.repoPath;
    const list = glob.sync('**/*.*', {
      cwd: repoPath
    })

    if (list.length === 0 ) {
      return [];
    }
    const map = [];
    const {repoName, name} = this.config;
    const baseUrl = 'https://raw.githubusercontent.com/';
    const baseOrigin = `${baseUrl}${name}/${repoName}/master/`;
    list.forEach(item => {
     
      const extname = path.extname(item).replace(/^\./, '');
      if (extname && extnameMap.includes(extname.toUpperCase())) {
        const url = baseOrigin + 'data/' + path.basename(item);
        map.unshift(url);
      }
    })
    return map;
  }
}

module.exports = Collector;