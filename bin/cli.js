#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const cmd = require('./command.js');

program
  .version(pkg.version)
  .option('-p, --path <path>', '上传指定路径下的文件')
  .option('--init <git>', '初始化环境（git为git地址）')
  .option('--update', '升级工具版本')
  .action(options => {
    if(options.update) {
      util.update();
    } else if (options.init){
      cmd.init(options);
    } else if(options.path) {
      cmd.addFile(options);
    } else if (options.update) {
      cmd.update();
    }
  });

program.parse(process.argv);
