<template>
  <div class="col-sm-4 mb-3">
    <h4 class="text-light">Follow Us</h4>
    <div class="social-links">
      <a
        v-if="footerSocials.facebook_url"
        :href="footerSocials.facebook_url"
        class="footer-social"
        target="_blank"
      >
        <i class="fab fa-facebook"></i>
      </a>
      <a
        v-if="footerSocials.instagram_url"
        :href="footerSocials.instagram_url"
        class="footer-social"
        target="_blank"
      >
        <i class="fab fa-instagram"></i>
      </a>
      <a
        v-if="footerSocials.twitter_url"
        :href="footerSocials.twitter_url"
        class="footer-social"
        target="_blank"
      >
        <i class="fab fa-twitter"></i>
      </a>
      <a
        v-if="footerSocials.youtube_url"
        :href="footerSocials.youtube_url"
        class="footer-social"
        target="_blank"
      >
        <i class="fab fa-youtube"></i>
      </a>
      <a
        v-if="footerSocials.tiktok_url"
        :href="footerSocials.tiktok_url"
        class="footer-social"
        target="_blank"
      >
        <i class="fab fa-tiktok"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerSocials: [],
    }
  },
  mounted() {
    this.$nuxt.context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'settings/',
      })
      .then((res) => {
        this.footerSocials = res.data.stories[0].content
      })
      .catch((error) => {
        console.error(error)
      })
  },
}
</script>

<style scoped>
.footer-social {
  color: #fff !important; /* White icon color */
  font-size: 1.5rem; /* Larger icon size for better visibility */
  margin-right: 1rem;
}

.footer-social:hover {
  color: #ccc !important; /* Light grey on hover */
}
</style>
