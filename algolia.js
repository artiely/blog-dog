const path = require('path')
const execSync = require("child_process").execSync;
// 修改
const index_name = 'xx'
// 修改
const domain = 'http://'
// 修改
const postsDir = path.resolve(__dirname, './xx')

const searchConfig = {
  index_name: index_name,
  start_urls: [],
  selectors: {
    lvl0: {
      selector: "",
      global: true,
      default_value: "Documentation",
    },
    lvl1: ".content h1",
    lvl2: ".content h2",
    lvl3: ".content h3",
    lvl4: ".content h4",
    lvl5: ".content h5",
    lvl6: ".content p, .content li",
    text: ".content [class^=language-]",
  },
  nb_hits: 100,
};
const readDir=(entry, files)=> {
  const dirInfo = fs.readdirSync(entry);

  dirInfo.forEach((item) => {
    const location = path.join(entry, item);
    const info = fs.statSync(location);
    if (info.isDirectory()) {
      readDir(location, files);
    } else {
      if ([".md"].includes(path.extname(location))) {
        files.push(location);
      }
    }
  });
}

const readFiles=(dir)=> {
  let files = [];
  readDir(dir, files);
  return files;
}
let files = readFiles(postsDir);
try {
  const urls = files.map((v) => `${domain}${v.link}`);
  searchConfig.start_urls = [...searchConfig.start_urls, ...urls];
// TODO: 验证是否可行
  // execSync(`docker run -it --env-file=.env -e "CONFIG=${JSON.stringify(searchConfig)}" algolia/docsearch-scraper`)

  fs.writeFile(
    path.join(path.dirname(__dirname), "../config.json"),
    JSON.stringify(searchConfig),
    function (error) {
      if (error) {
        console.log("写入失败");
      } else {
        execSync(`docker run -it --env-file=.env -e "CONFIG=$(cat config.json | jq -r tostring)" algolia/docsearch-scraper`)
        // console.log("写入成功了");
      }
    }
  );
} catch (error) {
  console.log("🚀 ~ file: config.js ~error", error);
}

