<template>
  <div class="img-box">
    <img
      :src="item.frontmatter.cover"
      @load="imgLoaded"
      loading="lazy"
      :class="{ isImgLoaded: isLoaded }"
      class="cover"
      alt="cover"
    />
  </div>
  <div
    class="loading"
    :class="{ isLoaded: isLoaded }"
    :style="{ backgroundColor: hexToRgba(`#${item.frontmatter.primary}`, 0.1) }"
  ></div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  item: Object,
});
const hexToRgba = (hex, opacity) => {
  return (
    "rgba(" +
    parseInt("0x" + hex.slice(1, 3)) +
    "," +
    parseInt("0x" + hex.slice(3, 5)) +
    "," +
    parseInt("0x" + hex.slice(5, 7)) +
    "," +
    opacity +
    ")"
  );
};
let isLoaded = ref(false);
const imgLoaded = () => {
  console.log("加载完毕");
  isLoaded.value = true;
};
</script>
<style lang="scss" scoped>
.img-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .cover {
    object-fit: cover !important;
    width: 100%;
    height: 230px;
    display: block;
    opacity: 0;
  }
  .isImgLoaded {
    opacity: 1 !important;
  }
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0.8;
  backdrop-filter: saturate(180%) blur(20px);
  &:hover {
    opacity: 1;
    transition: 0.1s;
  }
}

.isLoaded {
  transition: 0.4s;
  opacity: 0;
}
</style>
