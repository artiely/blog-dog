## todo

[x] 详情上一篇下一篇

[x] 详情相关文章推荐

[x] 搜索
 
## 配置文章的路径

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

## 自定义主题颜色

新建`.vuepress/styles/palette.scss`文件

重写主题颜色

```scss
$color: green;
```

## 自定义页面

新建文件`.vuepress/components`

安装依赖

```
yarn add  @vuepress/plugin-register-components@next
```

修改配置`.vuepress/config.js`

```js
plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
],
```
配置导航
```js
themeConfig: {
    //...
    navbar: [
      // NavbarItem
      {
        text: 'Page',
        link: '/page',// 注意link不要与你的articlesDir文件名重复，除非你知道重复的影响
      },
    ],
  },
```

新建页面组件`.vuepress/components/Page.vue`
```
<template>
我是新建的页面组件
</template>
<script setup>
const nav = __NAVBAR__
const post = __POST__
console.log({nav,post})
</script>
```

新建页面`docs/page/index.md`并引入组件
```md
<Page />
```
重启服务`yarn dev`

访问`/page`就可以看到自定义的页面
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
│ │ ├──2020-3-16-windows-plugin.md
│ │ └──2020-3-18-electron-mirror-down.md
│ └──README.md
├──.gitignore
├──README.md
├──color.js
├──package.json
├──server.js
└──yarn.lock
```

## Frontmatter
可插件生成的
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

## 如何为你的网站开启搜索

todo:


## 布局替换规则

```
---
#layout: CustomHome #全局替换整个页面，你有更大的自由度。
---
# foo

<Test /> # 渲染到`.md-body`中
```

如果你想全局部分替换可以再`CustomHome`导入主题自带组件
主题提供的自带组件目前有
```js
import Navbar from '@theme/Navbar.vue'
import Navbar from '@theme/Layout.vue'
```
