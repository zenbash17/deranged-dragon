<script>
import { Bar, Line, mixins } from 'vue-chartjs'
const r = Math.round (Math.random () * 255)
const g = Math.round (Math.random () * 255)
const b = Math.round (Math.random () * 255)

export default {
  mixins: [mixins.reactiveData],
  extends: Line,
  props: ["chartResponse", 'year'],
  data() {
    return {
      data: [],
      chartData: '',
      labels: [],
      casualties: [],

      options: {
        hover: {
          onHover: function(e) {
            e.target.style.cursor = 'pointer';
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: '#191d20',
                fontSize: 14,
              },
              gridLines: {
                display: true,
                // color: '#191d20',
              },
              labels: {
                fontColor: '#fff',
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                // color: '#191d20',
              },
              ticks: {
                fontColor: '#191d20',
                // minRotation: 90,
                fontFamily: "'Lato', sans-serif",
                fontSize: 14,
                // fontStyle: 'italic',
              },
            },
          ],
        },
        legend: {
          display: false,
          labels: {
            fontColor: '#191d20',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.loadChart()
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    loadChart() {
      delete this.chartResponse.content["_editable"]
      delete this.chartResponse.content["_uid"]
      delete this.chartResponse.content["component"]
      this.casualties = Object.values(this.chartResponse.content)
      // console.log(this.casualties)
      this.labels = Object.keys(this.chartResponse.content)
      // console.log(this.labels)
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            label: 'No. of casualties',
            borderWidth: 3,
            backgroundColor: `rgba(${r}, ${g}, ${b}, .5)`,
            borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
            pointBackgroundColor: 'white',
            pointBorderColor: `rgba(${r}, ${g}, ${b}, .8)`,
            data: this.casualties,
            pointRadius: 6,
          },
        ],
      }
    }
  }
}
</script>
