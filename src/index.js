const child = require('child_process');
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
const chalk = require('chalk');
const util = require('./util/index');

class PictureBed {
  constructor() {
    this.init();
    this.config = null;
  };

  init() {
    const configPath = path.resolve(__dirname, '../upload.config.json');
    const configData = fse.readJSONSync(configPath)
    const repoPath = path.resolve(__dirname, '../repo', configData.repoName)
    this.config = configData;
    this.config.repoPath = repoPath;
    return configData;
  }

  initLocal(git) {

    if (!git) {
      return console.log('### 请输入git地址 ###');
    }
    const repoPath = path.resolve(__dirname, '../repo');
    // 克隆仓库
    util.spawn(`git clone ${git}`, {
      cwd: repoPath
    });
    const repoName = glob.sync('*', {
      cwd: repoPath
    })[0];
    const config = {
      git,
      name: util.getUserName(git),
      repoName,
      repoPath: path.resolve(repoPath, repoName),
      originRepo: git.replace(/:/, '/').replace(/^git@/, 'https://').replace(/\.git$/, '')
    }
    this.updateConfig(config);
    this.updataReadMe(repoName);
    this.gitPush('upload: first commit');
  }

  addImage(filePath) {
    const basename = path.basename(filePath);
    const repoInfo = this.getRepoInfo();
    fse.copyFileSync(filePath, repoInfo.localRepoDataP + '/' + basename);
    this.gitPush(`添加文件${basename}`);
    this.showTips(basename);
  }

  getRepoInfo() {
    if (this.config) {
      return this.config;
    }
    let info = null;
    if (!this.config) {
      info = this.init();
    }
    const localRepoDataP = path.resolve(__dirname, '../repo', info.repoName, 'data');
    const repoPath = path.resolve(__dirname, '../repo', info.repoName)
    fse.ensureDirSync(localRepoDataP);
    Object.assign(info, { localRepoDataP, repoPath });
    return info;
  }

  updataReadMe(repoName) {
    const readmePath = path.resolve(__dirname, '../repo', repoName, 'README.md');
    const defaultRm = path.resolve(__dirname, './default/README.md');
    if (!fse.existsSync(readmePath)) {
      fse.copyFileSync(defaultRm, readmePath);
    } else {
      // 更新readme
    }
  }

  showTips(filename) {
    console.log('当前仓库地址为：' + chalk.green(this.config.originRepo));

    if(filename) {
      const {repoName, name} = this.config;
      const baseUrl = 'https://raw.githubusercontent.com/';
      const origin = `${baseUrl}${name}/${repoName}/master/data/${filename}`;
      console.log(`文件地址：${origin}`);
    }
  }

  gitPush(txt = 'update') {
    const repoInfo = this.getRepoInfo();
    try {
      util.spawn('git add .', {cwd: repoInfo.repoPath });
      util.spawn(`git commit -m ${txt}`, {cwd: repoInfo.repoPath });
      util.spawn('git push origin master', {cwd: repoInfo.repoPath });
      console.log(chalk.bold.green(`更新到远程仓库成功：${txt}`));
    } catch (error) {
      console.log(chalk.bold.red(`更新到远程仓库失败：${txt}`), error);
    }
  }

  updateConfig(obj) {
    const configPath = path.resolve(__dirname, '../upload.config.json');
    const configData = fse.readJSONSync(configPath);
    // 合并对象
    Object.assign(configData, obj);
    fse.writeJSONSync(configPath, configData);
  }

  getConfig() {
    const configPath = path.resolve(__dirname, '../upload.config.json');
    return fse.readJSONSync(configPath);
  }
}

module.exports = PictureBed