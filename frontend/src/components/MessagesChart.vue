<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
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