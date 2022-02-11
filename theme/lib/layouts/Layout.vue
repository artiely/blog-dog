<template>
  <div class="dog ">
    <slot name="header">
      <NavBar />
    </slot>
    <div class="body"> 
      <slot name="main">
        <component :is="dynamic" />
      </slot>
    </div>
    <slot name="footer">
      <Footer />
    </slot>
   <ThemeMeta />
  </div>
</template>
<script setup>

import {  usePageData } from "@vuepress/client";
import Home from "./Home.vue";
import ThemeMeta from "./ThemeMeta.vue";
import Detail from "./Detail.vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";

let dynamic = usePageData().value.path == "/" ? Home : Detail;

</script>
<style lang="scss">
@import "../styles/var.scss";
@import "../styles/index.scss";
/* 从调色板中引入变量 */
@import "@vuepress/plugin-palette/palette";
/* 设置变量的默认值 */
$color: red !default;

/* 在你的样式中使用变量 */
.palette-title {
  color: $color;
}

.dog {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* .body{
    padding-top:var(--nav-height);
  } */
}
.sidebar {
  background: none;
  /* width:auto; */
  /* position:relative;
  top: 0; */
}


/* .dog-sidebar{
  ul,ol{
  list-style: none;
  line-height:1.4;
  padding-left:0;
}
.sidebar-item.sidebar-heading{
  font-size:1em;
  padding-left:0;
}
.sidebar-item:not(.sidebar-heading){
  font-size:.6em;
  line-height:1;
  padding-left:1em;
}
.sidebar-item-children .sidebar-item-children .sidebar-item:not(.sidebar-heading){
  padding-left:1em;
}
} */
</style>
