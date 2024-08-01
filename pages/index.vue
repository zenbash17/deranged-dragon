<template>
  <div>
    <Hero :slides="slides" />
    <div class="site-section py-sm-5 py-5 bg-light">
      <div class="def-container container">
        <div class="row">
          <!-- Projects section -->
          <div class="col-sm-4 px-sm-3 mb-5">
            <div class="row">
              <div class="col-7">
                <h2 class="mb-3 section-title">Our Projects</h2>
              </div>
              <div class="col-5 py-sm-1 py-0 text-right">
                <nuxt-link to="/project" class="btn view-all bg-light"
                  >View All <i class="fas fa-angle-right"></i
                ></nuxt-link>
              </div>
            </div>

            <div class="testimonial-wrapper mt-sm-4">
              <b-carousel
                id="carousel-fade"
                fade
                indicators
                style="text-shadow: 0px 0px 2px #000"
                img-width="1024"
                img-height="480"
              >
                <b-carousel-slide
                  class="testim__slide"
                  v-for="project in projects"
                  :key="project.id"
                >
                  <template v-slot:img>
                    <img
                      class="testimonial-img img-fluid rounded"
                      width="1024"
                      height="480"
                      :src="project.content.image | transformImage"
                      :alt="project.content.name"
                    />
                    <div class="carousel-caption text-left">
                      <nuxt-link
                        :to="'/project/' + project.slug"
                        class="text-white"
                      >
                        <h3>{{ project.content.name }}</h3>
                        <span class="testim__text">
                          {{ project.content.summary }}</span
                        >
                      </nuxt-link>
                    </div>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
          </div>
          <!-- Posts section -->
          <div class="col-sm-8 px-sm-5 mb-5">
            <div class="row">
              <div class="col-7">
                <h2 class="section-title">Recent Posts</h2>
              </div>
              <div class="col-5 py-sm-1 py-0 text-right">
                <nuxt-link to="/article" class="btn view-all bg-light"
                  >View All <i class="fas fa-angle-right"></i
                ></nuxt-link>
              </div>
            </div>

            <div class="row news-section mt-sm-4">
              <ArticlePreview
                v-for="article in articles.slice(0, 4)"
                :key="article.slug"
                :title="article.content.title"
                :excerpt="article.content.summary"
                :thumbnailImage="article.content.thumbnail | transformImage"
                :id="article.slug"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="site-section py-sm-5 py-5">
      <div class="def-container container">
        <div class="row pb-sm-4 pb-4">
          <div class="col-sm-12">
            <h2 class="section-title text-center">Our YouTube</h2>
          </div>
        </div>
        <div class="row">
          <div
            class="col-sm-4 mb-3"
            v-for="video in videos.slice(0, 3)"
            :key="video.id"
          >
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
          </div>
        </div>
        <div class="row py-sm-4 py-4">
          <p>
            PARC (Public Affairs Research Center) is renowned for its
            exceptional production of documentaries, feature films, short films,
            and educational content, with a particular focus on disaster risk
            communication. Known for its commitment to insightful storytelling
            and rigorous research, PARC creates compelling narratives that
            explore the complexities of communicating disaster risks. Our
            productions aim to inform, educate, and engage audiences on how to
            effectively convey crucial information during emergencies,
            delivering impactful and thought-provoking content that resonates
            deeply and inspires action. <br />
          </p>

          <div class="col-12 text-center">
            <nuxt-link to="/videos" class="btn view-all-videos"
              >View All <i class="fas fa-angle-right"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <medium />

    <DisasterChart
      :username="settings.twitter_username"
      :fbID="settings.facebook_username"
    />
  </div>
</template>

<script>
import ArticlePreview from '@/components/Article/ArticlePreview'
import Medium from '~/components/medium.vue'
export default {
  components: {
    ArticlePreview,
    Medium,
  },
  data() {
    return {}
  },
  async asyncData(context) {
    const [articles, projects, slides, videos, settings] = await Promise.all([
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'article/',
      }),
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'projects/',
      }),
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'carousel/',
      }),
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'videos/',
      }),
      context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: 'settings/',
      }),
    ])

    return {
      articles: articles.data.stories,
      projects: projects.data.stories,
      slides: slides.data.stories,
      videos: videos.data.stories,
      settings: settings.data.stories[0].content,
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
.view-all-videos {
  border: none;
  background: teal;
  color: white;
}
.view-all-videos:hover {
  background: teal;
  color: white;

  cursor: pointer;
}
.view-all-videos:focus,
.view-all:focus {
  box-shadow: none;
}
.fa-angle-right {
  margin: 0 0.5rem;
  transition: all 0.5s ease 0s;
}
.view-all:hover .fa-angle-right,
.view-all-videos:hover .fa-angle-right {
  -webkit-transform: translateX(8px);
  transform: translateX(8px);
}
@media only screen and (max-width: 600px) {
  .section-title {
    font-size: 1.6rem;
  }
}
</style>
