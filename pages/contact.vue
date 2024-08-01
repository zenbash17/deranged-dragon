<template>
  <div id="main">
    <top-section :title="title" :image="image" />

    <!-- second section -->
    <div class="second_section py-sm-5 py-5">
      <div class="container">
        <div class="main-content" v-html="$md.render(content)"></div>

        <!-- Contact Form -->
        <div class="contact-form-container mt-4">
          <h2>Have questions?</h2>
          <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="message">Message:</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-control"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-teal mt-3">Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var $ = require('jquery')
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/contact', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      })
      .then((res) => {
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          image: res.data.story.content.top_image,
          name: res.data.story.name,
          email: res.data.story.content.email,
          phone: res.data.story.content.phone,
          address: res.data.story.content.address,
          facebook: res.data.story.content.facebook,
          twitter: res.data.story.content.twitter,
          linkedin: res.data.story.content.linkedin,
        }
      })
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  mounted() {
    $(document).ready(function () {
      $('img').css({ 'max-width': '100%' }),
        $('.container a').css({
          'text-decoration': 'none',
          'font-weight': '500',
        })
    })
  },
  methods: {
    submitForm() {
      // Form submission logic
      alert('Form submitted successfully!')
    },
  },
  head() {
    return {
      title: this.name + ' - Parc Nepal',
    }
  },
}
</script>

<style scoped>
#main p {
  white-space: pre-line;
}
.contact-info,
.social-media,
.contact-form-container {
  margin-top: 20px;
}
.contact-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.form {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}
.form-control {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.form-control:focus {
  border-color: teal;
  box-shadow: 0 0 5px rgba(0, 128, 128, 0.5);
  outline: none;
}
.btn-teal {
  background-color: teal;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}
.btn-teal:hover {
  background-color: #004d4d;
}
.contact-info h2,
.social-media h2,
.contact-form-container h2 {
  color: teal;
  font-size: 24px;
  margin-bottom: 15px;
}
.container a {
  color: teal;
  transition: color 0.3s ease-in-out;
}
.container a:hover {
  color: #004d4d;
}
</style>
