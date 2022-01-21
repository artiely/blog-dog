<script setup lang="ts">
// import NavbarItems from '@theme/NavbarItems.vue'
import SidebarItems from '@theme/SidebarItems.vue'
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
.dog-sidebar{
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
}

</style>