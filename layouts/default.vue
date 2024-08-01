<template>
  <div class="app-wrapper">
    <Navbar />
    <main class="main-content">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Your site description here',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap',
        },
      ],
    }
  },
}
</script>

<style>
:root {
  --primary-color: #008080; /* Teal, you can change this */
  --secondary-color: #f4f4f4;
  --text-color: #333;
  --link-color: #0056b3;
  --font-family: 'Roboto', sans-serif;
}

html {
  box-sizing: border-box;
  font-size: 15px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: var(--font-family);
  color: var(--text-color);
  line-height: 1.6;
  background-color: var(--secondary-color);
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--primary-color);
}

img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
</style>
