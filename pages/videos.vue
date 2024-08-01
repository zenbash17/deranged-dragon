<template>
  <div id="main">
    <div class="topbar">
      <div class="top-bg-section">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-8 text-center pt-5 pb-5">
              <h1 class="h2 text-center" style="color: teal; font-size: 4em">
                PARC's Production
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video section -->
    <div class="site-section py-sm-5 py-5">
      <div class="container">
        <div class="row video-section mt-sm-4">
          <div class="col-sm-4 mb-3" v-for="video in videos" :key="video.id">
            <div
              class="embed-responsive rounded embed-responsive-16by9"
              v-if="video.content.video_url.includes('facebook.com')"
            >
              <client-only>
                <iframe
                  loading="lazy"
                  scrolling="no"
                  frameborder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  :src="`https://www.facebook.com/plugins/video.php?href=${video.content.video_url}&width=500&show_text=false`"
                  class="embed-responsive-item"
                ></iframe>
              </client-only>
            </div>
            <div v-else>
              <client-only>
                <video-embed
                  class="rounded"
                  :src="video.content.video_url"
                ></video-embed>
              </client-only>
            </div>
            <!-- Add video description -->
            <p v-if="video.content.description" class="video-description">
              {{ video.content.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var $ = require('jquery')
export default {
  async asyncData(context) {
    const [videos] = await Promise.all([
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'videos/',
      }),
    ])

    return {
      videos: videos.data.stories,
    }
  },
  head() {
    return {
      title: 'All Videos - Parc Nepal',
    }
  },
}
</script>

<style scoped>
.top-bg-section {
  display: block;
  width: 100%;
  overflow: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: rgb(255, 255, 255);
  background-size: cover;
}
.video-description {
  margin-top: 1rem;
  color: #333; /* Adjust color as needed */
}
</style>
