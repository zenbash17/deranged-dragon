<template>
  <div class="hero site-section">
    <b-carousel indicators>
      <b-carousel-slide v-for="(slide, index) in slides" :key="index">
        <template v-slot:img>
          <nuxt-link :to="slide.content.link">
            <div>
              <img
                :src="slide.content.image | transformImage"
                :alt="'slide-' + index"
                class="img-fluid hero-img"
              />
              <div class="hero-text">
                <h1 class="text-white">{{ slide.content.headline }}</h1>
                <span class="h5 sub__heading text-white font-weight-normal">{{
                  slide.content.subheadline
                }}</span>
              </div>
            </div>
          </nuxt-link>
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>

export default {
  props: ['slides'],
  filters: {
    transformImage: function(image, option) {
      if (!image) return ''
      option = '1920x1080'
      let imageService = '//img2.storyblok.com/'
      let path = image.replace('//a.storyblok.com', '')
      return imageService + option + path
    },
  },
}
</script>

<style scoped>
.hero-text h1 {
  line-height: 50px;
  font-size: 2.3rem;
}
@media only screen and (min-width: 768px) {
  .sub__heading {
    display: block;
    max-width: 70%;
  }
}
@media only screen and (max-width: 600px) {
  .sub__heading {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 30px;
  }
  .hero-text h1 {
    font-size: 2rem;
    line-height: 40px;
  }
  .hero-img {
    height: 90vh;
  }
}
</style>