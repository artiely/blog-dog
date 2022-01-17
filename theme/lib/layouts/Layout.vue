<template>
  <div>
    <p class="palette-title">123</p>
    <slot name="header">
      <NavBar />
    </slot>
    <slot name="main">
      <component :is="dynamic" />
    </slot>
    <slot name="footer">footer</slot>
  </div>
</template>
<script setup>
import { useSiteData, usePageData } from "@vuepress/client";
import { markRaw, toRaw } from "vue";

import "../styles/font.css";
import Home from "./Home.vue";
import Detail from "./Detail.vue";
import NavBar from "./NavBar.vue";

// let dynamic = usePageData().value.path == "/" ? Home : Detail;
let dynamic = usePageData().value.path == "/" ? Detail : Detail;
</script>
<style lang="scss">
* {
  font-family: Nunito, sans-serif;
  -webkit-font-smoothing: antialiased;
}
/* 从调色板中引入变量 */
@import "@vuepress/plugin-palette/palette";
/* 设置变量的默认值 */
$color: red !default;

/* 在你的样式中使用变量 */
.palette-title {
  color: $color;
}
</style>
