<template>
  <div class="sidebar-box">
    <div class="con">
      <Sidebar />
    </div>
  </div>
  <!-- <div class="page-meta-box">
    
  <img v-if="frontmatter.cover" class="cover" :src="frontmatter.cover" alt="">
  <div class="page-meta">
    <h1>{{ frontmatter.title }}</h1>
    <p>
      <span class="date">{{ dayjs(frontmatter.date).format("YY-MM-DD") }}</span>
      <span class="words">{{ frontmatter.words }}字</span>
      <span class="readTime">{{ frontmatter.readTime }}</span>
    </p>
    <p>
      <span class="tag" v-for="tag in frontmatter.tag">{{ tag }}</span>
    </p>
    <p class="summary">{{ frontmatter.summary }}</p>
  </div>
  </div> -->

  <div class="md-body sino sino-kai" :class="useLayout">
    <div class="default-content">
      <Content />
    </div>
    <ReadingProgress />
  </div>
</template>
<script setup>
import Sidebar from "./Sidebar.vue";
import ReadingProgress from "./ReadingProgress.vue";
import { usePageData } from "@vuepress/client";
import { onMounted, onUpdated, watch } from "vue";
import pinyin from "pinyin";
import dayjs from "dayjs";
import calendar from "../calendar.js";
import { useRoute } from "vue-router";
const route = useRoute();
import "lightgallery/css/lightgallery-bundle.css";
watch(
  () => route.path,
  async () => {
    lightImage();
  }
);
const { useLayout } = usePageData().value.frontmatter || {};
const frontmatter = usePageData().value.frontmatter || {};

const [y, m, d] = dayjs(usePageData().value.frontmatter.date)
  .format("YYYY-MM-DD")
  .split("-");

const lightImage = () => {
  var commentContents = document.getElementsByClassName("md-body");
  for (var i = 0; i < commentContents.length; i++) {
    var commentItem = commentContents[i];
    var imgEls = commentItem.getElementsByTagName("img");
    if (imgEls.length > 0) {
      for (var j = 0; j < imgEls.length; j++) {
        var imgEl = imgEls[j];
        var aEl = document.createElement("a");
        aEl.setAttribute("class", "tk-lg-link");
        aEl.setAttribute("href", imgEl.getAttribute("src"));
        aEl.setAttribute("data-src", imgEl.getAttribute("src"));
        aEl.appendChild(imgEl.cloneNode(false));
        imgEl.parentNode.insertBefore(aEl, imgEl.nextSibling);
        imgEl.remove();
      }
      import("lightgallery").then((res) => {
        res.default(commentItem, {
          selector: ".tk-lg-link",
          share: false,
        });
      });
    }
  }
};
onMounted(() => {
  lightImage();
  Array.from(document.querySelectorAll(".content")).map((v) => {
    let py = pinyin(v.innerText.replace("#", ""), {
      style: pinyin.STYLE_NORMAL,
    }).join(" ");
    v.setAttribute("pinyin", py);
  });

  // Array.from(document.querySelectorAll(".default-content img")).map((v) => {
  // v.onload=((res)=>{
  //   v.height=parseInt(v.height/30)*30
  // })
  // })
});
</script>
<style lang="scss">
.table-of-contents {
  position: fixed;
}
@media (max-width: 900px) {
  div[class*="language-"].line-numbers-mode .line-numbers {
    display: none;
  }
  div[class*="language-"].line-numbers-mode::after {
    display: none;
  }
  div[class*="language-"].line-numbers-mode pre {
    margin-left: 0;
  }
}

@media (max-width: 1400px) {
  .sidebar-box .dog-sidebar {
    display: none;
  }
}
.md-body {
  box-sizing: border-box;
  margin-top: calc(var(--nav-height) + 40px) !important;
}
.page-meta-box {
  position: relative;
  margin: 2em auto;
  max-width: var(--md-body-width);

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.page-meta {
  /* position:absolute;
  top: 0;
  left: 0;*/

  position: relative;
  z-index: 2;
  max-width: var(--md-body-width);
  padding: 20px 20px 60px 20px;

  .tag {
    padding: 0em 0.5em;
    border-right: 1px solid #ccc;
    &:last-child {
      border: none;
    }
  }
  .date,
  .words,
  .readTime {
    padding: 0.2em 0.5em;
    background: #eee;
    border-radius: 2px;
    margin-right: 0.5em;
  }
  .summary {
    opacity: 0.7;
  }
}
</style>
