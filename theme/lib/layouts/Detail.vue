<template>
  <div class="sidebar-box">
    <div class="con">
      
      <Sidebar />
    </div>
  </div>
  <!-- <div class="page-meta-box">
    
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
  </div> -->

  <div class="md-body sino sino-kai" :class="useLayout">
  <nav class="table-of-contents"> <Toc /> </nav>
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
import calendar from "../calendar.js";
// import defineClientAppSetup from "../plugin-active-header-links/lib/client/clientAppSetup.js"

// import { useActiveHeaderLinks } from '../plugin-active-header-links/lib/client/composables';

const { useLayout } = usePageData().value.frontmatter || {};
const frontmatter = usePageData().value.frontmatter || {};
console.log(usePageData().value)

// useActiveHeaderLinks({ headerLinkSelector : 'a.sidebar-item', headerAnchorSelector : '.header-anchor', delay : 200, offset : 5 })

console.log(dayjs(usePageData().value.frontmatter.date).format('YYYY-MM-DD').split('-'))
const [y,m,d] = dayjs(usePageData().value.frontmatter.date).format('YYYY-MM-DD').split('-')

console.log(calendar.solar2lunar(y,m,d))
onMounted(() => {
  Array.from(document.querySelectorAll(".content")).map((v) => {
    //let py = pinyin(v.innerText.replace(/[^\u4e00-\u9fa5|,]+/,'')).join(' ')
    let py = pinyin(v.innerText.replace("#", ""), {
      style: pinyin.STYLE_NORMAL,
    }).join(" ");
    v.setAttribute("pinyin", py);
  });

  // document.querySelector("date").setAttribute("calendar")
  // TODO:
  // if(document.querySelector("html").classList=='theme6'){
    Array.from(document.querySelectorAll(".default-content img")).map((v) => {
    v.onload=((res)=>{
      // 30为一个行高 16=1em 26=1.7em
      // v.width=100
      console.log(v.height/30)
      v.height=parseInt(v.height/30)*30
    })
  })
  // }
  // const ctrl=`<div class="jsx-261514322 window-controls"><svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg><div class="jsx-261514322 window-title-container"></div></div>`
  // var newItem=document.createElement("div")
  // newItem.innerHTML = ctrl
  // Array.from(document.querySelectorAll("div[class*=language-]")).map((v)=>{
  //   v.appendChild(newItem)
  //   console.log("🚀 ~ file: Detail.vue ~ line 76 ~ Array.from ~ v", v.appendChild)
  // })
  
});
</script>
<style lang="scss">
.table-of-contents{
  position: fixed;
}
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
