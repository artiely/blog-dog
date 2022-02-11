<template>
  <section
    class="banner"
    :style="{ background: `url(${currPic()}) center center / cover no-repeat` }"
  >
    <div>
      <div class="h1">Miracles sometimes occur,</div>
      <div class="h1">but one has to work terribly for them.</div>
    </div>
  </section>
  <div class="main">
    <Articles />
  </div>
</template>
<script setup>
import Articles from "./Articles.vue";
const list = [
  "https://gitee.com/artiely/Figure-bed/raw/master/image/167-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/1031-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/1067-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/490-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/491-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/511-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/505-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/526-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/495-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/960-1200x800-grayscale.webp",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/20200408115926.png",
  "https://gitee.com/artiely/Figure-bed/raw/master/image/167-1200x800-grayscale.webp",
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
.banner {
  position: relative;
  width: 100%;
  height: 100vh;
  font-family: "Josefin Sans";
  line-height: 1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(
    to right,
    rgba(36, 31, 31, 1) 0%,
    rgba(36, 31, 31, 1) 32%,
    rgba(74, 71, 70, 1) 100%
  );
  text-align: center;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  .h1 {
    font: normal 300 54px / 1 "Josefin Sans", sans-serif;

    color: #fafafa;
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
    height: 80%;
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.8) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.8) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
  }
}
</style>
