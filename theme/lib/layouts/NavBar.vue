<template>
  <header class="header">
  <span @click="handleTheme('')">light</span>
  <span @click="handleTheme('dark')">dark</span>
  <span @click="handleTheme('theme1')">theme1</span>
  <span @click="handleTheme('theme2')">theme2</span>
  <span @click="handleTheme('theme3')">theme3</span>
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
import { computed ,onMounted} from "vue";
const navBar = __NAVBAR__;
const themeLocale = useThemeLocaleData();
const enableDarkMode = computed(() => themeLocale.value.darkMode);
const handleTheme = (theme)=>{
  document.querySelector('html').classList=theme
}

</script>
<style lang="scss">
/* @import '../styles/base/var.scss'; */
.header {
  height: var(--nav-height);
  position: fixed;
  z-index:9;
  width: 100%;
  top: 0;
  box-shadow:0 0 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  backdrop-filter: saturate(180%) blur(20px);
  background: var(--nav-bg);
  .nav{
    margin:0 auto;
    max-width: var(--nav-content-max-width);
    display: flex;
    align-items: center;
    .link{
      padding:40px;
    }
  }
}
</style>
