const { path } = require('@vuepress/utils')
require('dotenv-flow').config();
module.exports = {
  // base:'/',
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  // debug: true,
  shouldPrefetch:true,
  // home:'/',
  themeConfig: {
    postsDir:path.resolve(__dirname, '../posts'),
    logo: 'https://vuejs.org/images/logo.png',
    valine:{
      appId:process.env.VALINE_APPID,
      appKey:process.env.VALINE_APPKEY
    },
    navbar: [
      // NavbarItem
      {
        text: 'Home',
        link: '/',
      },
      // {
      //   text: 'Foo',
      //   link: '/foo',
      // },
      {
        text: 'Timeline',
        link: '/timeline',
      },
      {
        text: 'Comment',
        link: '/comment',
      },
    ],
  },
  // plugins: [
  //   [
  //     '@vuepress/register-components',
  //     {
  //       componentsDir: path.resolve(__dirname, './components'),
  //     },
  //   ],
  // ],
  theme:'vuepress-theme-dog',
  // theme:path.resolve(__dirname, '../../theme/lib/index.js'),
}