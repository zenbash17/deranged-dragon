<template>
  <div id="main">
    <div class="topbar">
      <div class="top-bg-section">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-8 text-center pt-5 pb-5">
              <h1 class="h2 text-center" style="color: teal; font-size: 3em">
                Latest Articles
              </h1>
              <!---->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- second section -->
    <div class="site-section py-sm-5 py-5">
      <div class="container">
        <div class="row news-section mt-sm-4">
          <NewsPreview
            v-for="article in articles"
            :key="article.id"
            :title="article.title"
            :excerpt="article.subtitle"
            :thumbnailImage="article.thumbnailImage | transformImage"
            :id="article.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var $ = require('jquery')
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'article/',
      })
      .then((res) => {
        // console.log(res)
        return {
          articles: res.data.stories.map((bp) => {
            return {
              id: bp.slug,
              title: bp.content.title,
              subtitle: bp.content.summary,
              thumbnailImage: bp.content.thumbnail,
              date: bp.published_at,
            }
          }),
        }
      })
  },
  head() {
    return {
      title: 'All Posts - Parc Nepal',
    }
  },

  filters: {
    transformImage: function (image, option) {
      if (!image) return ''
      option = '500x300'
      let imageService = '//img2.storyblok.com/'
      let path = image.replace('//a.storyblok.com', '')
      return imageService + option + path
    },
  },
}
</script>

<style scoped>
.top-bg-section {
  background-color: white;
}
#main p {
  white-space: pre-line;
}
</style>
