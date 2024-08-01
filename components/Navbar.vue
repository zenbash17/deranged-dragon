<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="white" class="py-0">
      <div class="def-container container-fluid">
        <nuxt-link to="/" class="navbar-brand">
          <img
            :src="brand.site_logo | transformImage"
            alt="Parc Nepal"
            class="img-fluid logo"
            v-if="!loading"
          />
          <!-- <b-spinner style="width: 2rem; height: 2rem;" v-else></b-spinner> -->
        </nuxt-link>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item" v-for="(nav, index) in mainNav" :key="index">
              <nuxt-link class="p-3 nav-route" :to="nav.link">{{
                nav.item
              }}</nuxt-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      loading: true,
      brand: [],
      mainNav: [
        {
          item: 'Home',
          link: '/',
        },
        {
          item: 'About',
          link: '/about',
        },
        {
          item: 'Our Partners',
          link: '/partners',
        },
        {
          item: 'Articles',
          link: '/article',
        },
        {
          item: '',
          link: '/contact',
        },
      ],
    }
  },
  mounted() {
    this.$nuxt.context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'settings/',
      })
      .then((res) => {
        // console.log(res.data.stories[0].content)
        this.brand = res.data.stories[0].content
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  filters: {
    transformImage: function (image, option) {
      if (!image) return ''
      option = '720x0'
      let imageService = '//img2.storyblok.com/'
      let path = image.replace('//a.storyblok.com', '')
      return imageService + option + path
    },
  },
}
</script>

<style scoped></style>
