const { path } = require('@vuepress/utils')
const removeMd = require("remove-markdown");
const ColorThief = require('colorthief');
const { createPage } = require('@vuepress/core');
// const  presetWind = require('@unocss/preset-wind').default
// const co=require('co')
// const  WindiCSS = require('vite-plugin-windicss').default
// const toc = require("markdown-toc");
// const styleImport = require("vite-plugin-style-import").default;
// const uslug = require("uslug");
const dayjs = require("dayjs");
const _ = require("loadsh");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const yaml = require("js-yaml");
const readingTime = require("reading-time");


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
function getPostsSidebar(dir) {
  let files=[]
  try {
    files = readFiltes(dir);
  }catch (e) {
    console.log("🚀 ~ file: index.js ~ line 45 ~ getPostsSidebar ~ 请设置正确的postsDir", e)
  }
  
  files = files
    .map( (item) => {
      // 读取内容
      const content = fs.readFileSync(item, "utf8");
      let re = /---(.*?)---/gs;
      let s = re.exec(content);
      let frontmatters = s && s[1] ? s[1] : {};
      let json = yaml.load(frontmatters);
      json.tag = json.tag || json.tags || [];
      json.date = dayjs(json.date).format("YYYY-MM-DD");
      json.author = json.author || "Artiely";
      json.password = json.password || false;
      json.base64 = json.base64 || "fafafa";
      json.summary = json.password
        ? "加密内容"
        : json.summary ||
          removeMd(
            content
              .trim()
              .replace(/---(.*?)---/gs, "")
              .replace(/^#+\s+(.*)/, "")
              .replace(/<script setup>(.*?)<\/script>/gs, "")
              .slice(0, 200)
          ) + " ...";
         



      // console.log(json.primary)
      // 获取读取时间
      let tim = readingTime(content);
      json.text = tim.text;
      json.words = tim.words;
      let v = item.split(dir)[1].split(".md")[0];
      let pathArr = dir.split('/')
      let relativePath =pathArr[pathArr.length - 1];
       return {
        text: "artiely",
        link: `/${relativePath}${v}`,
        frontmatter: json||{},
        id: uuid(),
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter && b.frontmatter.date).getTime() -
        new Date(a.frontmatter && a.frontmatter.date).getTime()
      );
    });
  // 正序
  // const list = _.cloneDeep(files);
  // const reverse = list.reverse();
  // 推荐
  // const hot = files.filter(
  //   (f) => f.frontmatter && f.frontmatter.hot && f.frontmatter.hot
  // );
  // 文章遍历出tags 进行分类
  var tags = [];
  files.map((v) => {
    let tempTags = [];
    if (v.frontmatter) {
      if (v.frontmatter.tag) {
        tempTags = v.frontmatter.tag;
      } else if (v.frontmatter.tags) {
        tempTags = v.frontmatter.tags;
      } else {
        tempTags = [];
      }
    }
    if(Object.prototype.toString.call(tempTags) !== '[object Array]'){
      tempTags=[tempTags]
    }
    tempTags.map((tag) => {
      const findIndex = (el) => {
        return el.tag == tag;
      };
      let index = tags.findIndex(findIndex);
      if (index == -1) {
        let newTag = {
          tag: tag,
          posts: [v],
        };
        tags.push(newTag);
      } else {
        tags[index].posts.push(v);
      }
    });
  });

  // 文章遍历出date 进行分类
  var timeline = [];
  files.map((v) => {
    let tempTimeline = v.frontmatter && v.frontmatter.date;

    const findIndex = (el) => {
      return el.date == tempTimeline;
    };
    let index = timeline.findIndex(findIndex);
    if (index == -1) {
      let newDate = {
        date: tempTimeline,
        posts: [v],
      };
      timeline.push(newDate);
    } else {
      timeline[index].posts.push(v);
    }
  });
  timeline = timeline.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime() >= 0
      ? -1
      : 1;
  });
  
  console.log(files)
  return {
    power: "artiely",
    posts: files,
    tags,
    timeline,
  }
    
}



const dogTheme = (options, app) => {
  console.log(options.navbar, app.options.themeConfig)
  return {
    // 初始化之后，所有的页面已经加载完毕
  async onInitialized(app) {
    // 如果主页不存在
    if (app.pages.every((page) => page.path !== '/')) {
      // 创建一个主页
      const homepage = await createPage(app, {
        path: '/',
        // 设置 frontmatter
        frontmatter: {
          layout: 'Layout',
        },
      })
      // 把它添加到 `app.pages`
      app.pages.push(homepage)
    }
  },
    name: 'vuepress-theme-dog',
    // alias: {
    //   // 为可替换的组件设置别名
    //   '@theme/Navbar.vue': path.resolve(__dirname, 'layouts/Navbar.vue'),
    //   '@theme/Layout.vue': path.resolve(__dirname, 'layouts/Layout.vue'),
    // },
    alias: Object.fromEntries(fs
      .readdirSync(path.resolve(__dirname, 'layouts'))
      .filter((file) => file.endsWith('.vue'))
      .map((file) => [
      `@theme/${file}`,
      path.resolve(__dirname, 'layouts', file),
  ])),
    extends:'@vuepress/theme-default',
    define: {
      __POSTS__:  getPostsSidebar(options.postsDir),
      __NAVBAR__: options.navbar
    },
    extendsPageData: (page) => {
      const meta = 'foobar'
      return { meta }
    },
    layouts: {
      Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      404: path.resolve(__dirname, 'layouts/404.vue'),
      clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),
    },
    themeConfig:{
      navbar:[
        // NavbarItem
        {
          text: 'Home',
          link: '/',
        },
      ],
    },
    
    markdown:{

    },
    extendsMarkdown: (md) => {
      // md.use(require('markdown-it-attribution'), {
      //   classNameContainer: 'md-body',
      //   // classNameAttribution: 'c-quote__attribution',
      //   marker: '>>',
      //   removeMarker: false,
      // })

      md.use(require('./markdown/markdown-it-span.js')) // 在标题标签中添加span
      .use(require('./markdown/markdown-it-table-container.js')) // 在表格外部添加容器
      // .use(require('./markdown/markdown-it-math.js')) // 数学公式
      // .use(require('markdown-it-math'))
      // .use(require('markdown-it-katex'))
      .use(require('markdown-it-table-of-contents'), {
        transformLink: () => "",
        includeLevel: [2, 3],
        markerPattern: /^\[toc\]/im,
      }) // TOC仅支持二级和三级标题
      .use(require('markdown-it-implicit-figures'), {figcaption: true}) // 图示
      .use(require('markdown-it-deflist')) // 定义列表
      .use(require('./markdown/markdown-it-multiquote')) // 给多级引用加 class
      .use(require('markdown-it-imsize'))
      .use(require('markdown-it-ruby'));

    },
    plugins: [
      // [
      //   '@vuepress/plugin-palette',
      //   { preset: 'sass'},
      // ],
      [
        '@vuepress/register-components',
        {
          componentsDir: path.resolve(__dirname, './layouts'),
        },
      ],
      // [
      //   '@vuepress/plugin-prismjs',{
      //     preloadLanguages:['markdown', 'jsdoc', 'yaml']
      //   }
      // ]
    ]
    
  }
}

module.exports = dogTheme