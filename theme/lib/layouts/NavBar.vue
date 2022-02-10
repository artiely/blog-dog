<template>
  <header class="header">
    <div class="header-main">
      <div class="logo">Artiely'Blog</div>
      <nav class="nav">
        <a
          :href="item.link"
          :class="getPath(item.link)"
          v-for="item in navBar"
          class="link"
          >{{ item.text }}</a
        >
      </nav>
    </div>
  </header>
</template>
<script setup>
import { useSiteData, usePageData } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

import ToggleDarkModeButton from "@theme/ToggleDarkModeButton.vue";
import { computed, onMounted, ref } from "vue";
const navBar = __NAVBAR__;
const path = ref();
const getPath = (link) => {
  if (!link || !path.value) return;
  return path.value == link || path.value == `${link}/` ? "active" : "";
};
onMounted(() => {
  path.value = window.location.pathname;
  console.log("🚀 ~ file: NavBar.vue ~ line 23 ~ onMounted ~ path", path);
});
</script>
<style lang="scss">
/* @import '../styles/base/var.scss'; */
.header {
  height: var(--nav-height);
  position: fixed;
  z-index: 9;
  width: 100%;
  top: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  backdrop-filter: saturate(180%) blur(20px);
  background: var(--nav-bg);
  /* display:flex;
  justify-content: center;
  align-items: center; */
  .logo {
    font-family: "Josefin Sans";
    font-size: 24px;
    padding-left: 20px;
  }
  .header-main {
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-between;
    max-width: var(--nav-content-max-width);
    /* width: 44em; */
  }
  .nav {
    display: flex;
    align-items: center;
    .link {
      padding: 40px 20px 40px 20px;
      font-size: 20px;
      &.active {
        color: var(--nav-active-color);
      }
    }
  }
}
</style>
