<template>
  <div id="main">
    <top-section :title="title" :image="image" />

    <!-- second section -->
    <div class="second_section py-sm-5 py-5">
      <div class="container">
        <div class="main-content" v-html="$md.render(content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
var $ = require('jquery')
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/digital', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      })
      .then((res) => {
        // console.log(res.data.story.name)
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          image: res.data.story.content.top_image,
          name: res.data.story.name,
        }
      })
  },
  mounted() {
    $(document).ready(function () {
      $('img').css({ 'max-width': '100%' }),
        $('.container a').css({
          'text-decoration': 'none',
          'font-weight': '500',
        })
    })
  },
  head() {
    return {
      title: this.name + ' - Parc Nepal',
    }
  },
}
</script>

<style scoped>
#main p {
  white-space: pre-line;
}
</style>
