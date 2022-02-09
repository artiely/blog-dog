import { defineClientAppEnhance } from '@vuepress/client'
import Timeline from './layouts/Timeline.vue'
export default defineClientAppEnhance(({ app, router, siteData }) => {
  // ...
  app.component('Timeline', Timeline)
})