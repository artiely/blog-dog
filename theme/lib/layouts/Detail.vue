<template>
  <div class="sidebar-box">
    <div class="con">
      <Sidebar />
    </div>
  </div>
  <div class="md-body ">
    <Content />
  </div>
</template>
<script setup>
import Sidebar from "./Sidebar.vue";
</script>
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
  .dog-sidebar {
    position: absolute;
    top: 40px;
    width: 100%;
    left: 100%;
  }
}
@media (max-width: 1400px) {
  .sidebar-box {
    display: none;
  }
}
@media (max-width:900px){
  div[class*=language-].line-numbers-mode .line-numbers{
    display:none;
  }
  div[class*=language-].line-numbers-mode::after{
    display: none;
  }
  div[class*=language-].line-numbers-mode pre{
    margin-left:0;
  }
}
</style>
