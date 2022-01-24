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
import Sidebar from "./Sidebar.vue";
import Meta from "./Meta.vue";
import { usePageData } from "@vuepress/client";
import {onMounted} from 'vue'
import pinyin from 'pinyin';

const { useLayout } = usePageData().value.frontmatter || {};
onMounted(()=>{
  Array.from(document.querySelectorAll('.content'))
  .map(v=>{
    //let py = pinyin(v.innerText.replace(/[^\u4e00-\u9fa5|,]+/,'')).join(' ')
    let py = pinyin(v.innerText.replace("#",''),{style:pinyin.STYLE_NORMAL}).join(' ')
    v.setAttribute('pinyin',py)
  })
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
@media (max-width: 1400px) {
  .sidebar-box .dog-sidebar {
    display: none;
  }
}
</style>
