<template>
<nav>
  <a :href="item.link" v-for="item in navBar">{{item.text}}</a>
</nav>
</template>
<script setup>
import { useSiteData, usePageData } from "@vuepress/client";
const navBar = __NAVBAR__
console.log("🚀 ~ file: NavBar.vue ~ line 6 ~ useSiteData, usePageData", useSiteData().value, usePageData().value)
</script>