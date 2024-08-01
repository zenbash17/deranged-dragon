<template>
  <div class="site-section py-sm-5 py-5">
    <div class="def-container container">
      <div class="row mt-3">
        <div class="col-12 mb-3">
          <h3 class="text-white text-center text-uppercase mb-5">
            We are available on :
          </h3>
        </div>
      </div>
      <div class="row mb-3 wrapper-row">
        <div class="col-12 wrapper d-flex justify-content-lg-center">
          <div
            class="col-md-3 col-lg-2 col-11 mb-3"
            v-for="(item, index) in items"
            :key="index"
          >
            <nuxt-link :to="item.route">
              <div
                class="text-center bg-white px-5 py-4 item"
                style="border-radius: 8px"
              >
                <img :src="item.icon" :alt="item.icon" class="media-icon" />
                <h5 class="truncate text-muted">{{ item.title }}</h5>
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
  data() {
    return {
      items: [
        {
          icon: '/tv.png',
          title: 'Television',
          route: '/tv',
        },
        {
          icon: '/radio.png',
          title: 'Radio',
          route: '/radio',
        },
        {
          icon: '/digital.png',
          title: 'Digital',
          route: '/digital',
        },
        {
          icon: '/print.png',
          title: 'Print',
          route: '/print',
        },
        {
          icon: '/outreach.png',
          title: 'Outreach',
          route: '/outreach',
        },
      ],
    }
  },
}
</script>

<style scoped>
.site-section {
  background: #ffffff;
  background-color: teal;
}
.media-icon {
  max-width: 70%;
  margin: 10px;
  padding: 10px;
}
.item:hover {
  box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.075);
}
@media (max-width: 768px) {
  .media-icon {
    max-width: 45%;
  }
  .wrapper-row {
    padding-left: 15px;
    padding-right: 15px;
  }
  .wrapper {
    overflow-x: auto;
  }
  .wrapper::-webkit-scrollbar {
    display: none;
  }
  .wrapper {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
}
</style>
