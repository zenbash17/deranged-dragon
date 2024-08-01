<template>
  <div id="main">
    <top-section :title="title" :image="image" />

    <!-- second section -->
    <div class="second_section py-sm-5 py-5">
      <div class="container">
        <div class="main-content" v-html="$md.render(content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
var $ = require('jquery')
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/about', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      })
      .then((res) => {
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          image: res.data.story.content.top_image,
          name: res.data.story.name,
        }
      })
  },
  mounted() {
    $(document).ready(function () {
      $('img').css({ 'max-width': '100%' })
      $('.container a').css({
        'text-decoration': 'none',
        'font-weight': '500',
        color: '#007BFF',
      })
    })
  },
  head() {
    return {
      title: this.name + ' - Parc Nepal',
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

#main {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

#main p {
  white-space: pre-line;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.second_section {
  background-color: #f9f9f9;
  padding: 3rem 0;
}

.main-content {
  font-size: 1rem;
}

/* Ensure text links have the right color */
.main-content a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.main-content a:hover {
  color: #0056b3;
}

/* Ensure images are styled correctly */
.main-content img {
  max-width: 100%;
  border-radius: 0.5rem;
}

/* Explicitly reset any background color on p elements to avoid black background */
.main-content p {
  background-color: transparent !important; /* Ensure no unwanted background color */
  color: #333; /* Set text color if needed */
}
</style>

<style>
.top-section {
  background-color: white;
  padding: 2rem 0;
  border-bottom: 1px solid #ddd;
}

.top-section h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.top-section img {
  width: 100%;
  border-radius: 0.5rem;
}
</style>
