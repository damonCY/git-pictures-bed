const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Koa = require('koa');
const Router = require('koa-router');
const chalk = require('chalk');
const static = require('koa-static');
const koaBody = require('koa-body');
const util = require('./util');
const Collector = require('./collector');

const collector = new Collector();

const app = new Koa();
const router = new Router();
const staticPath = path.resolve(__dirname, './client')

router.get('/list', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  try {
    const map = collector.getImgDbData();
    ctx.body = map;
  } catch (error) {
    console.log(`something wrong: ${error.message}`);
  }
})
router.post('/file', async ctx => {
  ctx.set('Access-Control-Allow-Origin', '*');
   
  const file = ctx.request.files.file;	// 获取上传文件
	const reader = fs.createReadStream(file.path);	// 创建可读流
  const ext = file.name.split('.').pop();		// 获取上传文件扩展名、
  const config = collector.getConfig();
  // const repoPath = path.resolve(__dirname, 'repos');
  const preTime = new Date().toLocaleDateString().replace(/\//, '_');
  const time = new Date().valueOf();
  const fileName = `${preTime}_${time}.${ext}`;
  // const fileName = preTime + '_' + file.name;
  fse.ensureDirSync(path.resolve(config.repoPath, 'data'));
	const upStream = fs.createWriteStream(path.resolve(config.repoPath, 'data', fileName));		// 创建可写流
  reader.pipe(upStream);
  ctx.body = {
    status: 'done'
  };
  reader.on('close', () => {
    collector.addImg(fileName).then(() => {
    })   
  })
  reader.on('error', (err) => {
    ctx.body = {
      file: {
        status: 'error',
      }
    }
  })
})

router.get('/', (ctx) => {
  ctx.redirect('/index.html')
})

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024	// 设置上传文件大小最大限制，默认2M
  }
}))

app.use(static(staticPath));
app.use(router.routes());


// app.listen(4000, () => {
//   console.log(chalk.green('git-pictures-bed: server start'));
// })

module.exports = {
  start() {
    app.listen(4000, () => {
      console.log(chalk.green('pictures-bed:'), chalk.green.bold('server start'));
    })
    util.openBrower('http://127.0.0.1:4000');
  }
}
