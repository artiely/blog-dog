<template>
  <Layout>
    <template #header> 我是自定义首页头header</template>
    <template #main>
      <div v-for="item in posts">
        <a :href="item.link">{{ item.frontmatter.title }}</a>
      </div>
    <Content />
    </template>
    <!-- <template #footer>footer</template> -->
  </Layout>
</template>
<script setup>
import Layout from "@theme/Layout.vue";
const posts = __POSTS__.posts;
</script>
