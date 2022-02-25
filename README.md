

# 这是一款自以为是的博客主题


![](https://gitee.com/artiely/Figure-bed/raw/master/20220225160753.png)

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
├──color.js
├──package.json
├──server.js
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



![](https://gitee.com/artiely/Figure-bed/raw/master/20220225175423.png)