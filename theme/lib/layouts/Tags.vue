<template>
  <Layout>
    <template #main>
      <div class="tag-main">
        <div class="tag-box">
          <ul>
            <li v-for="tag in tags">#{{tag.tag}} <span>{{tag.posts.length}}</span></li>
          </ul>
        </div>
      </div>
    </template>
  </Layout>
</template>
<script setup>
import Layout from "./Layout.vue";
const tags = __POSTS__.tags;
console.log("🚀 ~ file: Tags.vue ~ line 17 ~ tags", tags)
</script>
<style>
.tag-main {
  padding-top: 100px;
  max-width: 900px;
  margin: auto;
}
</style>
