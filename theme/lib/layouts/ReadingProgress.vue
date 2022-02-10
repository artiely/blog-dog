<template>
  <div v-if="$readingShow" :class="$readingShow" class="reading-progress">
    <div :style="progressStyle" class="progress"></div>
  </div>
</template>

<script>
export default {
  name: "ReadingProgress",
  data() {
    return {
      readingTop: 0,
      readingHeight: 1,
      progressStyle: null,
      $readingShow:'bottom',
    };
  },
  mounted() {
    this.base();
  },
  beforeDestroy() {
    this.$readingShow &&
      window.removeEventListener("scroll", this.getReadingBase);
  },
  methods: {
    base() {
        this.progressStyle = this.getProgressStyle();
        window.addEventListener("scroll", this.getReadingBase, 200);
    },
    getReadingBase() {
      this.readingHeight = this.getReadingHeight() - this.getScreenHeight();
      this.readingTop = this.getReadingTop();
      this.progressStyle = this.getProgressStyle();
    },
    getReadingHeight() {
      return document.body.scrollHeight || document.body.offsetHeight || 0;
    },
    getScreenHeight() {
      return window.innerHeight || document.documentElement.clientHeight || 0;
    },
    getReadingTop() {
      return window.pageYOffset || document.documentElement.scrollTop || 0;
    },
    getProgressStyle() {
      let progress = this.readingTop / this.readingHeight;
      return `width: ${progress * 100}%`;
    },
    supportCss(value) {
      const div = document.createElement("div");
      return value in div.style;
    },
  },
};
</script>

<style lang="scss" scoped>

.reading-progress {
  position: fixed;
  z-index: 1000;
  background: transparent;
  overflow: hidden;
}
.reading-progress .progress {
  width: 100%;
  height: 100%;
  background: var(--c-brand);
  background-image: none;
  transform-origin: 0% 0%;
  transition: transform 0.2s ease-out;
}
.top {
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
}
.bottom {
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
}


</style>
