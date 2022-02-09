import { defineClientAppEnhance } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'
import CustomHome from './CustomHome.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('CustomLayout', CustomLayout)
  app.component('CustomHome', CustomHome)
})