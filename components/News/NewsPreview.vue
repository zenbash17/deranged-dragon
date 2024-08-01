<template>
  <div class="col-sm-4 mb-sm-4 mb-4 post-container" :title="title">
    <nuxt-link :to="`/article/${id}`">
      <img
        :src="thumbnailImage"
        :alt="title"
        class="img-fluid post-img rounded"
      />
      <div class="post-text px-0">
        <h5 class="article-title text-dark">{{ title }}</h5>
        <p class="article-subtitle text-dark">{{ excerpt }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment'

Vue.use(require('vue-moment'))
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    thumbnailImage: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.post-img {
  height: 200px;
}
.post-text {
  padding: 10px;
}
.article-title,
.article-subtitle {
  color: #373737;
}
.article-title {
  line-height: 1.5;
}
.article-subtitle {   
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
