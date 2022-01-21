<template>
  <div class="dog">
    <slot name="header">
      <NavBar />
    </slot>
    <div class="main">
      <slot name="main">
        <component :is="dynamic" />
      </slot>
    </div>
    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>
<script setup>
import { useSiteData, usePageData } from "@vuepress/client";
import { markRaw, toRaw,onMounted } from "vue";
import Home from "./Home.vue";
import Detail from "./Detail.vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import Heti from 'heti/umd/heti-addon.min.js'
let dynamic = usePageData().value.path == "/" ? Home : Detail;
// let dynamic = usePageData().value.path == "/" ? Detail : Detail;

onMounted(()=>{
  // const heti = new Heti('.heti');
  // heti.autoSpacing();
})
</script>
<style lang="scss">

@import '../styles/var.scss';
@import '../styles/index.scss';
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
  .main {
    flex: 1;
    padding-top:$nav_height;
  }
}
</style>
