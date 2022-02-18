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
import {hexToRgba} from '../utils/index.js'

let isLoaded = ref(false);
const imgLoaded = () => {
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
  z-index: 2;
  opacity: 0.8;
  backdrop-filter: saturate(180%) blur(20px);
  &:hover {
    opacity: 1;
    transition: 0.1s;
  }
}

.isLoaded {
  transition: 1s;
  opacity: 0;
}
</style>
