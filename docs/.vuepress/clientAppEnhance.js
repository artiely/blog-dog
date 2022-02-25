import { defineClientAppEnhance } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'
import CustomHome from './CustomHome.vue'
import Test from './components/Test.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('CustomLayout', CustomLayout)
  app.component('CustomHome', CustomHome)
  app.component('Test', Test)
})