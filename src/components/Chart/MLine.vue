<template>
  <div id="assMix1"></div>
</template>

<script>
import { Mix } from '@antv/g2plot'
import { last } from '@antv/util'

export default {
  data() {
    return {
      plot: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      fetch('https://gw.alipayobjects.com/os/antfincdn/HkxWvFrZuC/association-data.json')
        .then(data => data.json())
        .then(data => {
          const plot = new Mix('assMix1', {
            tooltip: false,
            autoFit: true,
            legend: {
              position: 'top'
            },
            plots: [
              {
                type: 'line',
                options: {
                  data: data.line,
                  xField: 'time',
                  yField: 'value',
                  seriesField: 'area',
                  interactions: [{ type: 'element-highlight-by-color' }],
                  line: {},
                  point: { },
                  meta: {
                    time: { range: [0, 1] }
                  },
                  legend: {},
                  smooth: true,
                  slider: {},
                  tooltip: {
                    showCrosshairs: true,
                    shared: true
                  }
                }
              }
            ]
          })

          plot.render()

          this.plot = plot

          this.initPointTooltip()
        })
    },
    initPointTooltip() {
      const plotChart = this.plot?.chart
      this.plot?.update({
        tooltip: {
          showCrosshairs: false,
          shared: false
        }
      })
      const chartLine = plotChart?.views[0]
      const data = chartLine.filteredData || []
      const point = chartLine.getXY(last(data.filter(d => d.value === 281985)))
      plotChart.unlockTooltip()

      window.onresize = function () {
        console.log('asd')
      }
      if (plotChart.isPointInPlot(point)) {
        plotChart.showTooltip(point)
        plotChart.lockTooltip()
      } else {
        plotChart.hideTooltip()
      }
    }
  }
}
</script>
