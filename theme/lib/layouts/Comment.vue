<template>
  <Layout>
    <template #main>
      <div class="container-comment">
        <div id="comments"></div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import Layout from "./Layout.vue";
import { onMounted } from "vue";

import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

let { valine } = useThemeLocaleData().value;
onMounted(() => {
  if (valine && valine.appId && valine.appKey) {
    import("valine").then((res) => {
      new res.default({
        el: "#comments",
        appId: valine.appId,
        appKey: valine.appKey,
        avatar: "wavatar",
        path: "/comment/",
        placeholder: "闻道有先后，术业有专攻",
        // other config
      });
    });
  }
});
</script>
<style lang="scss">
.container-comment {
  padding-top: 140px;
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--primary-bg);
  padding-left: 40px;
  padding-right: 40px;
  .v[data-class="v"] .vcards .vcard .vquote {
    border: none;
  }
  .v[data-class="v"] .vinput,
  .v[data-class="v"] .veditor,
  .v[data-class="v"] p,
  .v[data-class="v"] pre code,
  .v[data-class="v"] .status-bar {
    color: var(--text-color);
  }
  .v[data-class="v"] .vcards .vcard .vh .vmeta .vat {
    color: var(--c-brand);
  }
  .v[data-class="v"] .vwrap {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    border: 0;
  }
  .v[data-class="v"] .vwrap .vheader .vinput:focus {
    border-bottom-color: var(--nav-active-color);
  }
  .v[data-class="v"] .vbtn {
    border-radius: 2px;
  }
  .v[data-class="v"] .vbtn:hover {
    color: var(--c-brand);
    border-color: var(--c-brand);
  }
  .v[data-class="v"] .vicon.actived {
    fill: var(--c-brand);
  }
}
</style>
