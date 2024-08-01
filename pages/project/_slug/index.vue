<template>
  <div id="post">
    <div class="post-hero site-section">
      <img
        :src="image | transformImage"
        alt="Hero image"
        class="img-fluid post-hero-img"
      />
    </div>
    <div class="site-section py-sm-5 py-5">
      <div class="container">
        <div class="title-section py-sm-5 py-3">
          <h1 class="article-title mb-4">{{ title }}</h1>
          <p class="h6">{{ summary }}</p>
        </div>

        <div class="main-content" v-html="$md.render(content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment'

Vue.use(require('vue-moment'))
var $ = require('jquery')
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/projects/' + context.params.slug, {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      })
      .then((res) => {
        // console.log(res)
        return {
          image: res.data.story.content.image,
          title: res.data.story.content.name,
          content: res.data.story.content.description,
          summary: res.data.story.content.summary,
        }
      })
  },
  filters: {
    transformImage: function (image, option) {
      if (!image) return ''
      option = '1920x1080'
      let imageService = '//img2.storyblok.com/'
      let path = image.replace('//a.storyblok.com', '')
      return imageService + option + path
    },
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
      title: this.title + ' - Parc Nepal',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.summary,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.summary,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$route.fullPath,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https:' + this.$options.filters.transformImage(this.image),
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@PARC_Nepal',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.summary,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https:' + this.$options.filters.transformImage(this.image),
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@PARC_Nepal',
        },
      ],
    }
  },
}
</script>

<style scoped>
.article-title {
  font-size: 2.2rem;
}
</style>
