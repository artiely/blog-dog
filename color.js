const ColorThief = require("colorthief");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const removeMd = require("remove-markdown");
const execSync = require("child_process").execSync;

const dayjs = require("dayjs");

function readDir(entry, files) {
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

function readFiltes(dir) {
  let files = [];
  readDir(dir, files);
  return files;
}
const rgbToHex = (r, g, b) =>
  "" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const contentToArray = (dir) => {
  let content = fs.readFileSync(dir, "utf8");
  return [content, content.split(/\r\n|\n|\r/gm)];
};

const yamlData = (contentArray) => {
  let tempYaml = [];
  let dashIndex = 1;
  if (contentArray[0] === "---") {
    for (let i = 1; i < contentArray.length; i++) {
      if (contentArray[i] === "---") {
        dashIndex++;
        continue;
      } else if (dashIndex >= 2) {
        continue;
      }
      tempYaml.push(contentArray[i]);
    }
  }
  return [...tempYaml].filter((x) => x);
};

const yamlToJson = (yamlData) => {
  const tempYaml = yamlData.join("\r\n");
  return yaml.load(tempYaml);
};

const getBirthtime = (dir) => {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (!err) {
        resolve(dayjs(stats.birthtime).format("YYYY-MM-DD"));
      } else {
        reject(undefined);
      }
    });
  });
};

const getSummary = (content) => {
  return (
    removeMd(
      content
        .trim()
        .replace(/---(.*?)---/gs, "")
        .replace(/^#+\s+(.*)/, "")
        .replace(/<script setup>(.*?)<\/script>/gs, "")
        .replace(/(\[(.[^\]]+)\]\((.[^)]+)\))/g, "")
        .slice(0, 200)
        .replace(/\r\n|\n|\r/gm, "")
    ) + " ..."
  );
};

const getCover = (content) => {
  let pattern = /(?<=\!\[.*\]\()(.+)(?=\))/g;
  try {
    return content.match(pattern)[0];
  } catch (error) {
    return undefined;
  }
};

const getGitName = () => {
  return execSync("git config user.name").toString().trim();
};

const getMdTitle = (contentArray) => {
  let h1 = contentArray.filter((v) => v.startsWith("# "))[0];
  if (h1) {
    return h1.slice(1).trim();
  } else {
    let h2 = contentArray.filter((v) => v.startsWith("## "))[0];
    if (h2) {
      return h2.slice(2).trim();
    }
    return;
  }
};

const getCoverColor = (cover) => {
  return new Promise((resolve, reject) => {
    try {
      ColorThief.getColor(cover).then((color) => {
        let primary = rgbToHex(color[0], color[1], color[2]);
        let secondary = rgbToHex(
          255 - color[0],
          255 - color[1],
          255 - color[2]
        );
        resolve([primary, secondary]);
      });
    } catch {
      resolve([dddddd, 333333]);
    }
  });
};

const replaceYaml = (yamlJson = {}, dir, content, contentArray) => {
  return new Promise(async (resolve, reject) => {
    let yaml = {};
    yaml.title = yamlJson.title || getMdTitle(contentArray) || "";
    yaml.data =
      yamlJson.date ||
      (await getBirthtime(dir)) ||
      dayjs(new Date()).format("YYYY-MM-DD");
    yaml.summary = yamlJson.summary || getSummary(content) || "";
    yaml.description = yamlJson.description || yaml.summary || "";
    yaml.cover = yamlJson.cover || getCover(content) || "";
    yaml.author = yamlJson.author || getGitName();
    const [primary, secondary] = await getCoverColor(yaml.cover);
    yaml.primary = yamlJson.primary || primary;
    yaml.secondary = yamlJson.secondary || secondary;
    resolve({ ...yamlJson, ...yaml });
  });
};

const jsonToYamlArr = (json) => {
  let yamlArray = [];

  for (let key in json) {
    yamlArray.push(`${key}: ${json[key]}`);
  }
  return ["---", ...yamlArray, "---"];
};

const writeYaml = (contentArray, newYaml, dir) => {
  console.log("🚀 ~ file: color.js ~ line 161 ~ writeYaml ~ newYaml", newYaml);
  let dashArray = [];
  contentArray.map((v, i) => {
    if (v === "---") {
      dashArray.push(i);
    }
  });
  console.log(dashArray);
  if (dashArray.length >= 2) {
    contentArray.splice(dashArray[0], dashArray[1] + 1, ...newYaml);
  } else {
    contentArray.splice(0, 0, ...newYaml);
  }
  fs.writeFileSync(dir, contentArray.join("\r\n"));
};
function getPostSidebar(dir) {
  let files = readFiltes(dir);
  files = files.map((fileDir) => {
    // 读取内容
    let [content, contentArray] = contentToArray(fileDir);
    let yaml = yamlData(contentArray);
    let yamlJson = yamlToJson(yaml);
    replaceYaml(yamlJson, fileDir, content, contentArray).then((res) => {
      // 修改
      let newYaml = jsonToYamlArr(res);
      console.log(
        "🚀 ~ file: color.js ~ line 175 ~ files=files.map ~ newYaml",
        newYaml
      );
      writeYaml(contentArray, newYaml, fileDir);
    });

    // let res = replaceYaml(yamlToJson(yamlData()),item,content)
    // console.log("🚀 ~ file: color.js ~ line 142 ~ files=files.map ~ res", res)

    // let re = /---(.*?)---/gs;
    // let s = re.exec(content);
    // let frontmatters = s && s[1] ? s[1] : {};
    // let json = yaml.load(frontmatters);
    // // console.log(json);
    // // console.log(s);
    // let data = fs.readFileSync(item, "utf8").split(/\r\n|\n|\r/gm);
    // console.log(">>>>");

    // yamlToJson(yamlData(data));
    // fs.stat(item, (err, stats) => {
    //   console.log(
    //     "🚀 ~ file: color.js ~ line 45 ~ files=files.map ~ res",
    //     stats.birthtime
    //   );
    // });
    // let json = {
    //   primary: [41, 116, 209],  // 图片主色调
    //   secondary: [41, 116, 209], // 图片的对比色
    //   title: "Electron 镜像下载慢的解决办法", // 文章的标题没有取文章的第一个#
    //   tag: ["electron"], // 非必须
    //   author: "Artiely", // 没有就取git，没有就取空
    //   date: "2020-3-18", // 时间没有当前
    //   cover:
    //     "https://gitee.com/artiely/Figure-bed/raw/master/images/20200318132822.png", // 封面
    //   base64: "2e7bd7",
    //   summary: '' 文章简介 没有就文章200字截取
    //   category: "electron",// 分类 非必须
    // };
    // console.log()

    // let frontmattersArr = [];
    // ColorThief.getColor(json.cover).then((color) => {
    //   let primary = rgbToHex(color[0], color[1], color[2]);
    //   let secondary = rgbToHex(255 - color[0], 255 - color[1], 255 - color[2]);
    //   frontmattersArr.push(`primary: ${primary}`);
    //   frontmattersArr.push(`secondary: ${secondary}`);

    //   if (!json.title) {
    //     const title = data.filter((v) => {
    //       return v.startsWith("#");
    //     })[0];
    //     frontmattersArr.push(`title: [${title}]`);
    //   }

    //   console.log(frontmattersArr);
    //   data.splice(1, 0, ...frontmattersArr);
    //   // fs.writeFileSync(item, data.join('\r\n'))
    // });
  });
}

getPostSidebar(path.resolve(__dirname, "./docs/post"));
