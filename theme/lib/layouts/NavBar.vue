<template>
  <header class="header">
    <nav class="nav">
      <a :href="item.link"  v-for="item in navBar" class="link">{{ item.text }}</a>
      <ToggleDarkModeButton v-if="enableDarkMode" />
    </nav>
  </header>
</template>
<script setup>
import { useSiteData, usePageData } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

import ToggleDarkModeButton from "@theme/ToggleDarkModeButton.vue";
import { computed } from "vue";
const navBar = __NAVBAR__;
const themeLocale = useThemeLocaleData();
const enableDarkMode = computed(() => themeLocale.value.darkMode);
console.log(
  "🚀 ~ file: NavBar.vue ~ line 6 ~ useSiteData, usePageData",
  useSiteData().value,
  usePageData().value
);
</script>
<style lang="scss">
@import '../styles/var.scss';
.header {
  height: $nav_height;
  position: fixed;
  z-index:9;
  width: 100%;
  top: 0;
  box-shadow:0 0 10px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  backdrop-filter: saturate(180%) blur(20px);
  background:var(--nav-bg);
  .nav{
    margin:0 auto;
    max-width: $main_width;
    display: flex;
    align-items: center;
    .link{
      padding:40px;
    }
  }
}
</style>
