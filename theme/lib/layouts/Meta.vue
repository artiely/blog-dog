<template>
  <div class="theme-box">
    <span class="theme-btn" @click="handleTheme('')">晓露</span>
    <span class="theme-btn" @click="handleTheme('dark')">寝安</span>
    <span class="theme-btn" @click="handleTheme('theme1')">典籍</span>
    <span class="theme-btn" @click="handleTheme('theme2')">浅云</span>
    <span class="theme-btn" @click="handleTheme('theme3')">逍遥</span>
    <span class="theme-btn" @click="handleTheme('theme4')">秋半</span>
    <span class="theme-btn" @click="handleTheme('theme5')">十漾</span>
  </div>
</template>
<script setup>
const handleTheme = (theme) => {
  document.querySelector("html").classList = theme;
};
</script>
<style lang="scss">
.theme-box {
  position: absolute;
  left: -100px;
  top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .theme-btn {
  }
}
</style>
