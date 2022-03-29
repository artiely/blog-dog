

# 修勾主题

这是一款自以为是的博客主题

![](https://gitee.com/artiely/Figure-bed/raw/master/20220225160753.png)

:green_heart: **基于vuepress@next**  vue3+vite

:beers: **使用简单** 零配置，直接开始写作markdown即可

:nail_care: **易扩展** 可自己定义一切

:art: **主题丰富** 自带丰富的主题不断迭代

:clipboard: **优化了中文排版** 优雅的中文排版样式和字体

:rocket: **无服务端** 无需服务器，无接口但可以自己扩展，纯静态资源可以再github，gitee等免费部署


## 示例演示

[https://artiely.github.io/](https://artiely.github.io/)

## 图片示例

![](https://gitee.com/artiely/Figure-bed/raw/master/1.png)

![](https://gitee.com/artiely/Figure-bed/raw/master/2.png)

![](https://gitee.com/artiely/Figure-bed/raw/master/3.png)

![](https://gitee.com/artiely/Figure-bed/raw/master/4.png)


## 如何使用

```sh
# 克隆模板
git clone  https://github.com/artiely/blog-dog.git
# 安装依赖
cd blog-dog
yarn
# 运行
yarn dev 
# or yarn build

```

开始写作，将你的markdown文章放入`docs/posts/`下


## 打包部署

参见`deploy.sh`文件注释



-----

以下为自定义内容

我们推荐使用模板，你也可以直接安装主题`yarn add vuepress-theme-dog`

## 配置文章的路径和菜单

`.vuepress/config.js`

```js
themeConfig: {
    articlesDir:path.resolve(__dirname, '../post'),
    //...
    navbar:[
      // 默认配置
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Timeline',
        link: '/timeline',
      },
    ]
}
```

## 主题提供的全局数据
```js
// 所有的文章列表信息
const articles = __POST__
// 导航信息
const nav = __NAVBAR__
```

## 自定义布局
在 `.vuepress/clientAppEnhance.js` 文件中注册一个布局组件：
```js
import { defineClientAppEnhance } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('CustomLayout', CustomLayout)
})
```
> 覆盖首页只需要修改README.md

## 在 Frontmatter 中设置自定义布局：
```md
---
layout: CustomLayout
---
```
## 自定义部分布局

可以通过插槽来自定义部分布局或全部

示例
```html
<template>
  <Layout>
    <template #header>header</template>
    <template #main>main</template>
    <template #footer>footer</template>
  </Layout>
</template>
<script setup>
import Layout from "@theme/Layout.vue";
</script>

```

## 布局替换规则

```
---
layout: CustomHome #全局替换整个页面，你有更大的自由度。
---
# foo

<Test /> # 渲染到`.md-body`中
```

如果你想全局部分替换可以再`CustomHome`导入主题自带组件
主题提供的自带组件目前有
```sh
├──404.vue
├──Articles.vue
├──Comment.vue
├──Cover.vue
├──Detail.vue
├──Footer.vue
├──Home.vue
├──Layout.vue
├──NavBar.vue
├──Page.vue
├──ReadingProgress.vue
├──Sidebar.vue
├──Tags.vue
├──ThemeMeta.vue
└──Timeline.vue
```



## 项目结构
```sh
├──docs
│ ├──.vuepress
│ │ ├──components
│ │ │ └──Test.vue
│ │ ├──styles
│ │ │ ├──index.scss
│ │ │ └──palette.scss
│ │ └──config.js
│ ├──foo
│ │ └──index.md
│ ├──post
│ │ ├──2021
│ │ │ └──2020-3-16-chrome-plugin.md
│ │ ├──2020-3-16-vscode-plugin.md
│ └──README.md
├──.gitignore
├──README.md
├──yaml.js #批量自动生成头部的Frontmatter脚本
├──package.json
├──server.js #打包后预览的脚本
├──imgToLocal.js #讲图片地址转本地相对路径 用于之前使用的gitee（加了放外链后）等做的图床迁移
└──yarn.lock
```

## Frontmatter
可自动生成
```yaml
---
#页面的标题。
title: 
#页面的描述
description:
summary:
# 页面的创建日期。
date: 
#阅读时间
readTime: 2 min read
# 文字统计
words: 172
# 文章封面
cover: 
---

```
非必须的
```yaml
#一个系列的文章拥有一样的group值
group: npm系列
#页面的永久链接。
permalink:
permalinkPattern:
#页面的布局。
layout:
#是否在当前页面的外部链接的后面添加外链图标。
externalIcon:
#页面 <head> 标签内添加的额外标签。
head:
# 自定义页面的类
pageClass: custom-page-class 
# 页面的语言。
lang:  
```

## 如何为你的网站开启评论
主题自带[valine](https://valine.js.org/)评论，你可以替换为自己喜欢的评论系统

`.env`里填写自己的`appid`和`appkey`


## 欢迎贡献此项目

喜欢请帮忙推广一下，点个小星星

## Environment Info:
```
System:
    OS: macOS 10.15.7
    CPU: (12) x64 Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
    Memory: 331.55 MB / 16.00 GB
    Shell: 5.7.1 - /bin/zsh
  Binaries:
    Node: 14.18.1 - /usr/local/bin/node
    Yarn: 1.22.10 - /usr/local/bin/yarn
    npm: 6.14.15 - /usr/local/bin/npm
  Utilities:
    Git: 2.24.3 - /usr/bin/git
  Browsers:
    Chrome: Not Found
    Edge: Not Found
    Firefox: Not Found
    Safari: 15.2
  npmPackages:
    @vuepress/bundler-vite:  2.0.0-beta.35 
    @vuepress/bundler-webpack: Not Found
    @vuepress/cli:  2.0.0-beta.35 
    @vuepress/client:  2.0.0-beta.35 
    @vuepress/core:  2.0.0-beta.35 
    @vuepress/markdown:  2.0.0-beta.35 
    @vuepress/plugin-active-header-links:  2.0.0-beta.35 
    @vuepress/plugin-back-to-top:  2.0.0-beta.35 
    @vuepress/plugin-container:  2.0.0-beta.35 
    @vuepress/plugin-debug: Not Found
    @vuepress/plugin-docsearch: Not Found
    @vuepress/plugin-external-link-icon:  2.0.0-beta.35 
    @vuepress/plugin-git:  2.0.0-beta.35 
    @vuepress/plugin-google-analytics: Not Found
    @vuepress/plugin-medium-zoom:  2.0.0-beta.35 
    @vuepress/plugin-nprogress:  2.0.0-beta.35 
    @vuepress/plugin-palette:  2.0.0-beta.35 
    @vuepress/plugin-prismjs:  2.0.0-beta.35 
    @vuepress/plugin-pwa: Not Found
    @vuepress/plugin-pwa-popup: Not Found
    @vuepress/plugin-register-components: Not Found
    @vuepress/plugin-search: ^2.0.0-beta.35 => 2.0.0-beta.35 
    @vuepress/plugin-shiki: Not Found
    @vuepress/plugin-theme-data:  2.0.0-beta.35 
    @vuepress/plugin-toc: Not Found
    @vuepress/shared:  2.0.0-beta.35 
    @vuepress/theme-default:  2.0.0-beta.35 
    @vuepress/utils:  2.0.0-beta.35 
    vue:  3.2.30 
    vue-loader: Not Found
    vue-router:  4.0.12 
    vuepress: ^2.0.0-beta.35 => 2.0.0-beta.35 
    vuepress-vite:  2.0.0-beta.35 
    vuepress-webpack: Not Found
```

![](https://gitee.com/artiely/Figure-bed/raw/master/20220225175423.png)
