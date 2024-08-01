<template>
  <div id="main">
    <!-- Top Section Component -->
    <top-section :title="folderTitle" :image="folderImage" />

    <!-- Stories Section -->
    <div class="stories_section py-sm-5 py-5">
      <div class="container">
        <div v-for="story in stories" :key="story.id" class="story-item mb-5">
          <h2>{{ story.content.title }}</h2>
          <!-- Render Markdown content -->
          <div class="story-content" v-html="renderContent(story.content.content)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      folderTitle: 'TV',  // Default title for the folder
      folderImage: '',    // Default image for the folder
      stories: [],        // Array to hold all stories
    }
  },
  methods: {
    // Convert Markdown content to HTML
    renderContent(content) {
      return this.$md.render(content || '')
    },
  },
  async asyncData(context) {
    try {
      const response = await context.app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'tv/',
        exclude_fields: 'long_text',  // Exclude long text fields if not needed
      });
      
      return {
        stories: response.data.stories,
        folderTitle: (response.data.stories[0] && response.data.stories[0].name) || 'TV',  // Use the first story's name as folder title or default to 'TV'
        folderImage: (response.data.stories[0] && response.data.stories[0].content.top_image) || '',  // Use the first story's top image or default to empty
      }
    } catch (error) {
      console.error('Error fetching data from Storyblok:', error);
      return {
        stories: [],
        folderTitle: 'TV',
        folderImage: '',
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      const images = document.querySelectorAll('img')
      images.forEach((img) => (img.style.maxWidth = '100%'))

      const links = document.querySelectorAll('.container a')
      links.forEach((link) => {
        link.style.textDecoration = 'none'
        link.style.fontWeight = '500'
      })
    }

    // Initialize Storyblok Bridge for live preview
    if (typeof window !== 'undefined' && window.storyblok) {
      window.storyblok.init()
      window.storyblok.on(['change', 'published'], () => {
        location.reload()
      })
    }
  },
  head() {
    return {
      title: this.folderTitle + ' - Parc Nepal',
    }
  },
}
</script>

<style scoped>
#main p {
  white-space: pre-line;
}
.story-item {
  margin-bottom: 2rem;
}
</style>
