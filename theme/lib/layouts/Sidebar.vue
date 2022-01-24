<script setup lang="ts">
import NavbarItems from "@theme/NavbarItems.vue";
import SidebarItems from "@theme/SidebarItems.vue";
</script>

<template>
  <aside class="dog-sidebar">
    <!-- <NavbarItems /> -->
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
<style lang="scss">
.sidebar-box {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .con {
    width: 100%;
    max-width: 900px;
    position: relative;
    padding: 20px;
  }
}
.dog-sidebar {
  position: absolute;
  top: 60px;
  left: 100%;
  width: 100%;
  ul,
  ol {
    list-style: none;
    line-height: 1.4;
    padding-left: 0;
  }
  .sidebar-item.sidebar-heading {
    font-size: 1em;
    padding-left: 0;
  }
  .sidebar-item:not(.sidebar-heading) {
    font-size: 0.6em;
    line-height: 1;
    padding-left: 1em;
  }
  .sidebar-item-children
    .sidebar-item-children
    .sidebar-item:not(.sidebar-heading) {
    padding-left: 1em;
  }
}
</style>
