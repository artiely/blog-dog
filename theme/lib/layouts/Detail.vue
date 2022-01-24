<template>
  <div class="sidebar-box">
    <div class="con">
      <Meta />
      <Sidebar />
    </div>
  </div>
  <div class="md-body sino sino-kai" :class="useLayout">
    <div class="default-content">
      <Content />
    </div>
  </div>
</template>
<script setup>
// import SidebarItems from '@theme/SidebarItems.vue'
import Sidebar from "./Sidebar.vue";
import Meta from "./Meta.vue";
import { usePageData } from "@vuepress/client";
import {onMounted} from 'vue'
import pinyin from 'pinyin';


console.log("🚀 ~ file: Detail.vue ~ line 23 ~ pinyin('中心')", pinyin('中心'))
console.log("🚀 ~ file: Detail.vue ~ line 21 ~ pinyin", pinyin)
const { useLayout } = usePageData().value.frontmatter || {};
onMounted(()=>{
  // import('pinyin4js').then(pinyin=>{
  //   console.log("🚀 ~ file: Detail.vue ~ line 27 ~ import ~ pinyin", pinyin)

  //   })
  Array.from(document.querySelectorAll('.content'))
  .map(v=>{
    //let py = pinyin(v.innerText.replace(/[^\u4e00-\u9fa5|,]+/,'')).join(' ')
    let py = pinyin(v.innerText.replace("#",'')).join(' ')
    v.setAttribute('pinyin',py)
  console.log("🚀 ~ file: Detail.vue ~ line 24 ~ document.querySelectorAll ~ v", py)
  })
  // pinyin4js.convertToPinyinString('厦门你好大厦厦门', '#', pinyin4js.WITH_TONE_MARK)
})
</script>
<style lang="scss">
@media (max-width: 900px) {
  div[class*="language-"].line-numbers-mode .line-numbers {
    display: none;
  }
  div[class*="language-"].line-numbers-mode::after {
    display: none;
  }
  div[class*="language-"].line-numbers-mode pre {
    margin-left: 0;
  }
}
</style>
