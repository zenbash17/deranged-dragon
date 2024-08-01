<template>
  <div id="main">
    <div class="topbar">
      <div class="top-bg-section">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-8 text-center pt-5 pb-5">
              <h1 class="h2 text-center" style="color: teal; font-size: 3em">
                <strong> Our Works</strong>
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
        <div class="row video-section mt-sm-4">
          <div
            class="col-sm-4 mb-sm-4 mb-4 post-container"
            v-for="project in projects"
            :key="project.id"
            :title="project.content.name"
          >
            <nuxt-link :to="`/project/${project.slug}`">
              <img
                :src="project.content.image | transformImage"
                :alt="project.content.name"
                class="img-fluid post-img rounded"
              />
              <div class="post-text px-0">
                <h5 class="article-title text-dark">
                  {{ project.content.name }}
                </h5>
                <p class="article-subtitle text-dark">
                  {{ project.content.summary }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const [projects] = await Promise.all([
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'projects/',
      }),
    ])

    return {
      projects: projects.data.stories,
    }
  },
  head() {
    return {
      title: 'All Projects - Parc Nepal',
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
  display: block;
  width: 100%;
  overflow: hidden;
  background: white;
  background-size: cover;
}
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
