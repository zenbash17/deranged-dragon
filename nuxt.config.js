const axios = require('axios')
require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Parc Nepal',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          "PARC is a legally registered company based in Kathmandu, Nepal. Established by a dynamic team of skilled and experienced communicators, PARC's strength, expertise and core competency are in development communities, outreach activities, research, survey & impact assessment...........",
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Parc Nepal',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Parc Nepal',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: '/',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'Website',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/og-image.png',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          "PARC is a legally registered company based in Kathmandu, Nepal. Established by a dynamic team of skilled and experienced communicators, PARC's strength, expertise and core competency are in development communities, outreach activities, research, survey & impact assessment...........",
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Parc Nepal',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Parc Nepal',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          "PARC is a legally registered company based in Kathmandu, Nepal. Established by a dynamic team of skilled and experienced communicators, PARC's strength, expertise and core competency are in development communities, outreach activities, research, survey & impact assessment.",
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.parcnepal.com/og-image.png',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@PARC_Nepal',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap',
      },
    ],
    scripts: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/composition-api.js',
    '~/plugins/rich-text-renderer.js',
    { src: '~/plugins/video-embed', ssr: false },
    {
      src: '@/plugins/aos',
      ssr: false,
    },
  ],

  env: {
    PRODUCTION_API: process.env.PRODUCTION_API,
    LOCAL_API: process.env.LOCAL_API,
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV == 'production'
            ? process.env.PRODUCTION_API
            : process.env.LOCAL_API,
        cacheProvider: 'memory',
      },
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/dotenv',
  ],

  markdownit: {
    injected: true,
    html: true,
  },
  sitemap: {
    hostname: 'https://www.parcnepal.com',
    exclude: ['/carousel/**', '/testimonial/**', '/settings/**'],
    defaults: {
      changefreq: 'daily',
    },
  },

  generate: {
    fallback: true,
    routes: function (callback) {
      const token = process.env.PRODUCTION_API
      const version = 'published'
      let cache_version = 0

      let toIgnore = ['home', 'en/settings']

      // other routes that are not in Storyblok with their slug.
      let routes = ['/'] // adds / directly

      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`)
        .then((space_res) => {
          // timestamp of latest publish
          cache_version = space_res.data.space.version

          // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
          axios
            .get(
              `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cache_version}&per_page=100`
            )
            .then((res) => {
              Object.keys(res.data.links).forEach((key) => {
                if (!toIgnore.includes(res.data.links[key].slug)) {
                  routes.push('/' + res.data.links[key].slug)
                }
              })

              callback(null, routes)
            })
        })
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
