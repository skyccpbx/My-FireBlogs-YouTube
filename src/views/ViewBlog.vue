<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>发表于: {{ new Date(this.currentBlog[0].blogDate).toLocaleString('zh-cn', { dateStyle: 'long' }) }}</h4>
      <!-- <img :src="this.currentBlog[0].blogCoverPhoto" alt="" /> -->
      <div class="post-content ql-editor" v-html="this.currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewBlog',
  data: () => ({
    currentBlog: null,
  }),
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter(post => {
      return post.blogID === this.$route.params.blogid
    })
  },
}
</script>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css');
.post-view {
  h2 {
    font-weight: 400;
    font-size: 1rem;
    padding-top: 45px;
    padding-bottom: 10px;
  }
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
  img {
    max-width: 1024px;
    margin: 10px auto;
    display: flex;
    width: 100%;
    margin-bottom: 32px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
  }
}
</style>
