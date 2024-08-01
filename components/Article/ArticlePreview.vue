<template>
  <div class="col-sm-6 mb-3 post-container" :title="title">
    <nuxt-link :to="'/article/' + id">
      <img
        :src="thumbnailImage"
        :alt="title"
        class="img-fluid post-img rounded"
      />
      <h5 class="text-white post-title">{{ title }}</h5>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: false,
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

<style></style>
