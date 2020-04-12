<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  // data: function() {
  //   return {
  //     chartdata: {
  //       //Data to be represented on x-axis
  //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  //       datasets: [
  //         {
  //           label: 'Data One',
  //           backgroundColor: '#f87979',
  //           pointBackgroundColor: 'white',
  //           borderWidth: 1,
  //           pointBorderColor: '#249EBF',
  //           //Data to be represented on y-axis
  //           data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
  //         }
  //       ]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false
  //     }
  //   }
  // },
  props: {
    chartData: Object,
    options: Object
  },
  mounted () {
    if (this.chartdata !== null) {
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>
<style scoped>

</style>