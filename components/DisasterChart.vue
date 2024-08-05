<template>
  <div class="py-5 site-section disaster-section bg-light">
    <div class="container">
      <h3
        class="disaster-section-title text-dark text-center text-uppercase mb-4"
      >
        Deaths from Disaster
      </h3>
      <div class="row">
        <div class="col-lg-7">
          <div class="chart-section">
            <div class="button-container mb-3">
              <button
                v-for="year in years"
                :key="year"
                :id="year"
                class="btn chart-button mx-1 mb-2"
                :class="{ active: year == currentYear }"
                @click="fetchCasualties(year)"
              >
                {{ year }}
              </button>
            </div>
            <small class="d-block mb-3"
              >Click the buttons to update the chart.</small
            >
            <div class="chart-container bg-white rounded p-3 mb-3">
              <p class="mb-2">Number of casualties in {{ currentYear }}</p>
              <line-chart
                v-if="loaded"
                :chartResponse="chartResponse"
                :year="currentYear"
                :chartColor="'#008080'"
                ref="disasterchart"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="chart-description">
            <h4 class="chart-title mb-3">Disaster Casualties by Year</h4>
            <p>
              This chart illustrates the number of casualties resulting from
              various disasters in {{ currentYear }}. The data shows
              fluctuations in mortality rates across different types of natural
              and man-made disasters.
            </p>
            <p>
             These statistics
              highlight the importance of disaster preparedness and response
              strategies in mitigating the impact of catastrophic events on
              human life.
            </p>
            <p>
              While some disaster types may show lower casualty numbers, they
              can still have significant long-term impacts on communities and
              ecosystems. This data serves as a crucial tool for policymakers,
              emergency response teams, and researchers in understanding
              patterns and developing more effective disaster management
              protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Chart.vue'
import { Timeline } from 'vue-tweet-embed'
import { Line, mixins } from 'vue-chartjs'

export default {
  mixins: [mixins.reactiveData],
  extends: Line,
  props: ['username', 'fbID'],
  components: {
    LineChart,
    Timeline,
  },
  data() {
    return {
      loaded: false,
      years: [],
      chartData: null,
      currentYear: '2015',
      labels: [],
      chartResponse: {},
    }
  },
  watch: {
    currentYear(newValue, oldValue) {
      document.getElementById(newValue).classList.add('active')
      document.getElementById(oldValue).classList.remove('active')
    },
  },
  mounted() {
    this.generateYears()
    this.loadYears()
    this.loaded = false
    this.$nuxt.context.app.$storyapi
      .get('cdn/stories', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        starts_with: `disaster-chart/${this.currentYear}`,
      })
      .then((res) => {
        this.chartResponse = res.data.stories[0]
        this.loaded = true
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear()
      for (let year = 2015; year <= currentYear; year++) {
        this.years.push(year.toString())
      }
    },
    loadYears() {
      this.$nuxt.context.app.$storyapi
        .get('cdn/stories', {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
          starts_with: 'disaster-chart/',
        })
        .then((res) => {
          const apiYears = res.data.stories.map((item) => item.name)
          this.years = this.years
            .filter((year) => apiYears.includes(year))
            .reverse()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fetchCasualties(year) {
      this.currentYear = year
      await this.$nuxt.context.app.$storyapi
        .get('cdn/stories', {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
          starts_with: `disaster-chart/${year}`,
        })
        .then((res) => {
          this.chartResponse = res.data.stories[0]
          this.$refs.disasterchart.loadChart()
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.disaster-section-title {
  color: #000;
  font-weight: bold;
  font-size: 1.8rem;
}

.chart-section {
  max-width: 100%;
}

.chart-container {
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.chart-button {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #000;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  margin-bottom: 0.5rem;
}

.chart-button:hover,
.chart-button.active {
  background-color: #008080;
  color: #fff;
  border-color: #008080;
}

.chart-title {
  font-size: 1.4rem;
  color: #000;
  font-weight: bold;
}

.chart-description {
  color: #000;
  line-height: 1.6;
}

.chart-description p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

@media (max-width: 991px) {
  .chart-description {
    margin-top: 2rem;
  }
}
</style>
