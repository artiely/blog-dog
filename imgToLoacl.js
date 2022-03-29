// 图床图片转到本地
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
var request = require("request");

let tempDirName = Date.now()

console.log(
  `\n 开始批量 修改图片路径 避免风险文件将自动备份到.backup/${tempDirName}`
)

let _postsDir = path.resolve(__dirname, "./docs/posts")
let _tempDir = path.resolve(__dirname, `./.backup/${tempDirName}`)



// 读取所有文件

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
}

var filesList = [];



function matchAndReplaceHttpImg(str, imgDir, dir, fileName) {
  // 正常的md图片 ![]()
  const regex = /http(.*?).(jpg|png|gif|webp|jpeg)/gim;
  let m;

  while ((m = regex.exec(str)) !== null) {
    // 这对于避免零宽度匹配的无限循环是必要的
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    //  拷贝下载图片 替换路径
    let imgUrl = m[0];
    let name = imgUrl.split("/").reverse()[0];
    let imgPath = imgDir + "/" + name;
    download_img(imgUrl, imgPath);
    let relPath = dir.split(fileName)[0];
    let finalPath = imgPath.split(relPath).reverse()[0];
    str = str.replace(m[0], "./" + finalPath);
  }
  // 匹配不是已./或/开头的相对路径 不然vite打包会报错
  const regex2 = /(?:!\[(.*?)\]\((.*?)\))/gm;
  let mUrl;

  while ((mUrl = regex2.exec(str)) !== null) {
    // 这对于避免零宽度匹配的无限循环是必要的
    if (mUrl.index === regex2.lastIndex) {
      regex2.lastIndex++;
    }
    if(!mUrl[2].startsWith('./')&&!mUrl[2].startsWith('/')){
      str = str.replace(mUrl[2], "./" + mUrl[2]);
      console.log(str)
    }
  }
  fse.writeFile(dir, str).then((err) => {
    if (err) {
      console.log("写入失败");
    } else {
      console.log("写入成功");
    }
  });
}


async function download_img(img_url, file_name) {
  await request(img_url)
    .pipe(fse.createWriteStream(file_name))
    .on("close", function () {
      //  console.log('pic saved!')
    });
}


fse.copy(_postsDir, _tempDir)
  .then(() => {
    readFileList(path.join(__dirname, "docs/posts"), filesList);
    // 遍历所有文件
    filesList.map((v) => {
      if (v.endsWith(".md")) {
        // 穿件资源文件夹
        let imgDir = v.replace(".md", ".assets");
        fse
          .ensureDir(imgDir)
          .then(() => {
            // 读取文件内容
            fse.readFile(v, "utf8").then((con) => {
              let fileName = v.split("/").reverse()[0];
              matchAndReplaceHttpImg(con, imgDir, v, fileName);
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  })
  .catch(err => console.error(err))
