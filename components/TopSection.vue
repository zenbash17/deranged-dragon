<template>
  <div class="topbar">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-8 text-center pt-5 pb-5">
          <h1
            class="h2 text-center"
            style="color: teal; font-size: 3em; background-color: white"
          >
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image', 'title'],
  methods: {
    transformImage(image, option) {
      if (!image) return ''
      if (!option) return ''

      let imageService = '//img2.storyblok.com/'
      let path = image.replace('//a.storyblok.com', '')
      return imageService + option + path
    },
  },
}
</script>

<style scoped>
.top-bg-section {
  display: block;
  width: 100%;
  overflow: hidden;
  font-family: 'Courier New', Courier, monospace;
}
.container {
  background-color: white;
}
.topbar {
  background-color: white;
}
</style>
