<template>
  <div class="theme-box">
    <span class="theme-btn" :class="theme==''?'active':''" @click="handleTheme('')">晓露</span>
    <span class="theme-btn" :class="theme=='dark'?'active':''" @click="handleTheme('dark')">寝安</span>
    <span class="theme-btn" :class="theme=='theme1'?'active':''" @click="handleTheme('theme1')">典籍</span>
    <span class="theme-btn" :class="theme=='theme2'?'active':''" @click="handleTheme('theme2')">浅云</span>
    <span class="theme-btn" :class="theme=='theme3'?'active':''" @click="handleTheme('theme3')">逍遥</span>
    <!-- <span class="theme-btn" :class="theme=='theme4'?'active':''" @click="handleTheme('theme4')">秋半</span> -->
    <span class="theme-btn" :class="theme=='theme5'?'active':''" @click="handleTheme('theme5')">十漾</span>
    <span class="theme-btn" :class="theme=='theme6'?'active':''" @click="handleTheme('theme6')">绿茶</span>
    <!-- <span class="theme-btn" :class="theme=='theme7'?'active':''" @click="handleTheme('theme7')">笔记</span> -->
    <span class="theme-btn" :class="theme=='theme8'?'active':''" @click="handleTheme('theme8')">极客</span>
    <span class="theme-btn" :class="theme=='theme9'?'active':''" @click="handleTheme('theme9')">轻拟</span>
    <div class="trigger">
      主题
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import {useLocalStorage} from '@vueuse/core'
const theme = ref('')
const themeData = useLocalStorage('theme',theme);
onMounted(()=>{
  document.querySelector("html").classList = themeData.value;
})
const handleTheme = (_theme) => {
  theme.value = _theme
  document.querySelector("html").classList = _theme;
};
</script>
<style lang="scss">
.theme-box {
  position: fixed;
  left: 0;
  top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .theme-btn {
    &.active{
      color:red;
    }
  }
}
</style>
