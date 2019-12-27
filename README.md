# git-pictures-bed


利用github做图床

## Installation
```console
npm install git-pictures-bed -g
```

## Compatibility

pb -h
```js
Usage: pb [options]

Options:
  -V, --version      output the version number
  -p, --path <path>  上传指定路径下的文件
  --init <git>       初始化环境（git为git地址）
  --update           升级工具版本
  -h, --help         output usage information
```

#### 初始化
在github上创建一个仓库作为存放图片的地方。
执行命令：`pb --init git@xxxx` (git@xxx 为git地址)

![pb --init](https://raw.githubusercontent.com/damonCY/image_db/master/data/image-20191227130735049.png)

#### 上传图片

```shell
pb --path '/xxx/image-20191227123429799.png'
```
![image-20191227124230098.png](https://raw.githubusercontent.com/damonCY/image_db/master/data/image-20191227124230098.png)
