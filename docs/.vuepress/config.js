const { path } = require('@vuepress/utils')
module.exports = {
  // base:'/',
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  debug: true,
  shouldPrefetch:true,
  // home:'/',
  themeConfig: {
    postsDir:path.resolve(__dirname, '../posts'),
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      // NavbarItem
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Foo',
        link: '/foo',
      },
      {
        text: 'Timeline',
        link: '/timeline',
      },
    ],
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
  theme:path.resolve(__dirname, '../../theme/lib/index.js'),
}