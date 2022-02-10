import { defineClientAppEnhance } from '@vuepress/client'
// import Timeline from './layouts/Timeline.vue'
import DIframe from './components/global/iframe/DIframe.vue'
export default defineClientAppEnhance(({ app, router, siteData }) => {
  // ...
  // app.component('Timeline', Timeline)
  app.component('DIframe', DIframe)
})