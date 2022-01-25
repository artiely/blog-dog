<template>
  <div class="sidebar-box">
    <div class="con">
      
      <Sidebar />
    </div>
  </div>
  <div class="page-meta-box">
    
  <img v-if="frontmatter.cover" class="cover" :src="frontmatter.cover" alt="">
  <div class="page-meta">
    <h1>{{ frontmatter.title }}</h1>
    <p>
      <span class="date">{{ dayjs(frontmatter.date).format("YY-MM-DD") }}</span>
      <span class="words">{{ frontmatter.words }}字</span>
      <span class="readTime">{{ frontmatter.readTime }}</span>
    </p>
    <p>
      <span class="tag" v-for="tag in frontmatter.tag">{{ tag }}</span>
    </p>
    <p class="summary">{{ frontmatter.summary }}</p>
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

import { usePageData } from "@vuepress/client";
import { onMounted } from "vue";
import pinyin from "pinyin";
import dayjs from "dayjs";

const { useLayout } = usePageData().value.frontmatter || {};
const frontmatter = usePageData().value.frontmatter || {};
console.log(usePageData().value)
onMounted(() => {
  Array.from(document.querySelectorAll(".content")).map((v) => {
    //let py = pinyin(v.innerText.replace(/[^\u4e00-\u9fa5|,]+/,'')).join(' ')
    let py = pinyin(v.innerText.replace("#", ""), {
      style: pinyin.STYLE_NORMAL,
    }).join(" ");
    v.setAttribute("pinyin", py);
  });
});
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
.md-body{
  box-sizing: border-box;
}
.page-meta-box{
  position: relative;
  margin: 2em auto;
  max-width: var(--md-body-width);
  
  .cover{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
}
.page-meta {
  /* position:absolute;
  top: 0;
  left: 0;*/
  
  position:relative;
  z-index:2;
  max-width: var(--md-body-width);
  padding: 20px 20px 60px 20px;
  
  .tag{
    padding: 0em .5em ;
    border-right: 1px solid #ccc;
    &:last-child{
      border:none;
    }
  }
  .date,.words,.readTime{
    padding: 0.2em .5em;
    background:#eee;
    border-radius:2px;
    margin-right:.5em;
  }
  .summary{
    opacity:.7;
  }
}
</style>
