const ColorThief = require("colorthief");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const removeMd = require("remove-markdown");
const execSync = require("child_process").execSync;
const readingTime = require("reading-time");
const dayjs = require("dayjs");

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
      resolve(['dddddd', '8085ab']);
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
    let tim = readingTime(content);
    yaml.readTime = yamlJson.readTime||tim.text;
    yaml.words = yamlJson.words||tim.words;

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
const  getPosts=(dir)=> {
  let files = readFiles(dir);
  files = files.map((fileDir) => {
    // 读取内容
    let [content, contentArray] = contentToArray(fileDir);
    let yaml = yamlData(contentArray);
    let yamlJson = yamlToJson(yaml);
    replaceYaml(yamlJson, fileDir, content, contentArray).then((res) => {
      // 修改
      let newYaml = jsonToYamlArr(res);
      writeYaml(contentArray, newYaml, fileDir);
    });
  });
}

getPosts(path.resolve(__dirname, "./docs/posts"));
