<template>
  <header class="header">
    <div class="header-main">
      <div class="logo">Artiely'Blog</div>
      <!-- <SearchBox /> -->
      <NavbarSearch />
      <nav class="nav">
        <a
          :href="item.link"
          :class="getPath(item.link)"
          v-for="item in navBar"
          :target="item.link.startsWith('http')?'_blank':'_self'"
          class="link"
          >{{ item.text }}</a
        >
      </nav>
    </div>
  </header>
  <div class="header-mobile">
    <div class="logo">Artiely'Blog</div>
    <div class="menu-btn" @click="showMenu=!showMenu">
      <i class="iconfont icon-hanbaocaidan"></i>
    </div>
    
  </div>
  <nav class="nav-mobile" v-show="showMenu">
      <a
        :href="item.link"
        :class="getPath(item.link)"
        v-for="item in navBar"
        class="link"
        >{{ item.text }}</a
      >
    </nav>
</template>
<script setup>
import { useSiteData, usePageData } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

import ToggleDarkModeButton from "@theme/ToggleDarkModeButton.vue";
import { computed, onMounted, ref } from "vue";
const navBar = __NAVBAR__;
const path = ref();

const showMenu  = ref(false)
const getPath = (link) => {
  if (!link || !path.value) return;
  return path.value == link || path.value == `${link}/` ? "active" : "";
};
onMounted(() => {
  path.value = window.location.pathname;
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
  display: block;
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
    height: 100%;
    /* width: 44em; */
  }
  .nav {
    display: flex;
    align-items: center;
    .link {
      padding: 0 20px;
      font-size: 20px;
      height: var(--nav-height);
      line-height: var(--nav-height);
      &.active {
        color: var(--nav-active-color);
      }
    }
  }
}
.header-mobile {
  display: none;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  background: var(--nav-bg);
  position: fixed;
  z-index: 9;
  width: 100%;
  top: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: saturate(180%) blur(20px);
  .logo {
    font-family: "Josefin Sans";
    font-size: 24px;
    padding-left: 20px;
  }
  .menu-btn {
    padding: 1em;
    .iconfont {
      font-size: 2em;
    }
  }
  
}
.nav-mobile {
    position: fixed;
    z-index: 10;
    top: var(--nav-height);
    left: 0;
    width: 100%;
    background: var(--nav-bg);
    backdrop-filter: saturate(180%) blur(20px);
    .link {
      display: block;
      padding: 1em;
      font-weight: bold;
    }
  }

@media (max-width: 900px) {
  .header {
    display: none;
  }
  .header-mobile {
    display: flex;
  }
}
</style>
