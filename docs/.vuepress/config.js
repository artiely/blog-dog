const { path } = require('@vuepress/utils')
require('dotenv-flow').config();
module.exports = {
  // base:'/',
  lang: 'zh-CN',
  title: "Artiely'blog",
  description: 'Artiely的博客',
  shouldPrefetch:true,
  themeConfig: {
    postsDir:path.resolve(__dirname, '../posts'),
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
      {
        text: 'Timeline',
        link: '/timeline',
      },
      {
        text: 'Comment',
        link: '/comment',
      },
      {
        text: 'Tags',
        link: '/tag',
      },
      {
        text: 'Github',
        link: 'https://github.com/artiely',
      },
    ],
  },
  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],
  theme:'vuepress-theme-dog',
}