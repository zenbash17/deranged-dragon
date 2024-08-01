<template>
  <footer class="site-footer">
    <div class="def-container container">
      <div class="row py-4">
        <div class="col-sm-4 mb-3">
          <h4>
            <nuxt-link to="/" class="text-light"
              >Public Affairs Research & Communication</nuxt-link
            >
          </h4>
          <p class="text-light">
            {{ footer.address }}
            <br />
            <a :href="'mailto:' + footer.email" class="text-white">{{
              footer.email
            }}</a>
          </p>
        </div>
        <div class="col-sm-4 mb-3">
          <h4 class="text-light">Quick Links</h4>
          <ul class="quick-links">
            <li v-for="(footerLink, index) in footerLinks" :key="index">
              <nuxt-link :to="footerLink.link" class="text-light">{{
                footerLink.item
              }}</nuxt-link>
            </li>
          </ul>
        </div>
        <FooterSocial />
      </div>
      <div class="text-center py-3">
        <p class="mb-0 text-light">
          Parc Nepal &copy; {{ new Date() | moment('YYYY') }} All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

Vue.use(require('vue-moment'))
export default {
  data() {
    return {
      footer: [],
      footerLinks: [
        { item: 'Articles', link: '/article' },
        { item: 'Projects', link: '/project' },
        { item: 'About', link: '/about' },
        { item: 'Contact', link: '/contact' },
      ],
    }
  },
  mounted() {
    this.$nuxt.context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'settings/',
      })
      .then((res) => {
        this.footer = res.data.stories[0].content
      })
      .catch((error) => {
        console.error(error)
      })
  },
}
</script>

<style scoped>
.site-footer {
  background-color: teal; /* Dark background color for a minimalist look */
  color: #fff; /* White text color for contrast */
}

.text-light {
  font-size: 1rem; /* Normal font size */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.quick-links {
  list-style: none; /* Remove default list style */
  padding: 0;
}

.quick-links li {
  margin-bottom: 0.5rem; /* Space between links */
}

.quick-links li a {
  color: #fff; /* Ensure links are white */
  text-decoration: none;
}

.quick-links li a:hover {
  text-decoration: underline; /* Underline on hover for better UX */
}
</style>
