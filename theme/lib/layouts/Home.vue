<template>
  <slot name="banner">
    <section
      class="banner"
      :style="{
        background: `url(${currPic()}) center center / cover no-repeat`,
      }"
    >
    <div class="mark">
    
      <div>
        <div class="h1">Miracles sometimes occur,</div>
        <div class="h1">but one has to work terribly for them.</div>
      </div>
      </div>
    </section>
  </slot>
  <slot name="main">
    <div class="main">
      <Articles />
    </div>
  </slot>
</template>
<script setup>
import Articles from "./Articles.vue";
const list = [
  "https://gitee.com/artiely/Figure-bed/raw/master/image/167-1200x800-grayscale.webp",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/1031-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/1067-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/490-1200x800-grayscale.webp",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/491-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/511-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/505-1200x800-grayscale.webp",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/526-1200x800-grayscale.webp",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/495-1200x800-grayscale.webp",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/960-1200x800-grayscale.webp",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/20200408115926.png",
  // "https://gitee.com/artiely/Figure-bed/raw/master/image/167-1200x800-grayscale.webp",
];

const currPic = () => {
  let idx = Math.floor(Math.random() * list.length);
  return list.splice(idx, 1);
};
</script>
<style lang="scss">
.main {
  flex: 1;
  width: 100%;
  margin: auto;
  max-width: var(--nav-content-max-width);
}
.mark{
  width:100%;
  height: 100%;
  /* background:
      linear-gradient(217deg, rgba(159 ,169 ,203, 0.9), rgba(255,0,0,0) 50%),
      linear-gradient(127deg, rgba(221, 183, 169, 0.9), rgba(0,255,0,0) 50%),
      linear-gradient(336deg, rgba(252, 212, 80, 0.9), rgba(0,0,255,0) 50%); */
      background: var(--c-bg);
  position: relative;
  font-family: "Josefin Sans";
  line-height: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  backdrop-filter: blur(20px);
}
.banner {
  position: relative;
  width: 100%;
  height: 50vh;
  font-family: "Josefin Sans";
  line-height: 1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* background: linear-gradient(
    to right,
    rgba(36, 31, 31, 1) 0%,
    rgba(36, 31, 31, 1) 32%,
    rgba(74, 71, 70, 1) 100%
  ); */
  /* background: linear-gradient(
    to right,
    rgba(36, 31, 31, 1) 0%,
    rgba(100, 100, 100, 1) 32%,
    rgba(255, 255, 255, 1) 100%
  ); */
  text-align: center;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  .h1 {
    font: normal 300 54px / 1 "Josefin Sans", sans-serif;

    color: var(--text-color);
    text-shadow: 0 0px 10px rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 2;
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 50%;
    /* background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(120, 120, 120, 0.5) 80%,
      var(--c-bg) 100%
    ); */
    
  }
}
</style>
