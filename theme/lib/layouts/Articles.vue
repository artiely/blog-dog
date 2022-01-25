<template>
  <div class="article-wrapper">
    <article class="article" v-for="item in posts">
      <div class="poster-wrapper" v-if="item.frontmatter">
        <a :href="link(item.link)">
          <div class="category" v-if="item.frontmatter.category">
            <span
              class="category-inner"
              :style="{
                backgroundColor: hexToRgba(
                  `#${item.frontmatter.secondary}`,
                  0.6
                ),
                color: `#${item.frontmatter.primary}`,
              }"
              >{{ item.frontmatter.category }}</span
            >
          </div>
          <Cover :item="item" />
        </a>
      </div>
      <div class="article-info" v-if="item.frontmatter">
        <h1 class="article-title">
          <a :href="link(item.link)">{{ item.frontmatter.title }}</a>
        </h1>
        <div class="article-tags" v-if="item.frontmatter.tags">
          <span class="tag" v-for="tag in item.frontmatter.tag">{{ tag }}</span>
        </div>
        <div class="article-con">
          <p class="article-desc">{{ item.frontmatter.summary }}</p>
        </div>

        <div class="article-meta">
          <span>{{ item.frontmatter.date }}</span>
          <span>{{ item.frontmatter.author }}</span>
        </div>

        <div class="more">
          <span
            >{{ item.frontmatter.words }}字/{{
              parseInt(item.frontmatter.readTime)
            }}分钟</span
          >
          <span class="read">阅读全文-></span>
        </div>
      </div>
    </article>
  </div>
</template>
<script setup>
import Cover from "./Cover.vue";
import { hexToRgba } from "../utils/index.js";
const posts = __POSTS__.posts;
const link=(link)=>`${link}.html`
// console.log("🚀 ~ file: Articles.vue ~ line 54 ~ __POSTS__", __POSTS__)
</script>
<style lang="scss" scoped>
@import "../styles/var.scss";
.article-wrapper {
  max-wrapper: $main_width;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .article {
    display: flex;
    flex-direction: column;
  }
  .poster-wrapper {
    height: 230px;
    width: 100%;
    overflow: hidden;
    position: relative;
    /* background: #ddd; */
  }
  .article-info {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .category {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    .category-inner {
      backdrop-filter: saturate(180%) blur(10px);
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-align-items: center;
      align-items: center;
      height: 40px;
      min-width: 120px;
      border-radius: 0 5px;
      white-space: nowrap;
      padding: 0 5px;
      font-family: Montserrat-SemiBold, Arial, Helvetica, sans-serif;
      font-size: 16px;
      text-transform: capitalize;
      color: #fff;
      background-color: #ffc107;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .article-title {
    width: 100%;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .article-con {
    flex: 1;
  }
  .article-desc {
    width: 100%;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .article-meta,
  .more {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
  }
  .more .read {
    color: #ff6928;
  }
  .article-tags {
    width: 100%;
    .tag {
      padding: 2px 6px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
  }
}
.article {
  width: 360px;
  height: 600px;
  box-shadow: 4px 2px 40px rgb(0 0 0 / 10%);
  margin: 20px;
  border-radius: 6px;
  overflow: hidden;
}
</style>
