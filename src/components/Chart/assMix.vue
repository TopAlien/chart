<template>
  <div id="assMix">
  </div>
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
          const plot = new Mix('assMix', {
            tooltip: false,
            height: 500,
            plots: [
              {
                type: 'pie',
                region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 0.45 } },
                options: {
                  data: data.pie,
                  angleField: 'bill',
                  colorField: 'area',
                  tooltip: {
                    showMarkers: false
                  },
                  radius: 0.85,
                  label: { type: 'inner', formatter: '{name}', offset: '-15%' },
                  interactions: [
                    { type: 'element-active' },
                    {
                      type: 'association-tooltip',
                      cfg: {
                        start: [
                          {
                            trigger: 'element:mousemove',
                            action: 'association:showTooltip',
                            arg: { dim: 'x', linkField: 'area' }
                          }
                        ]
                      }
                    },
                    {
                      type: 'association-highlight',
                      cfg: {
                        start: [
                          {
                            trigger: 'element:mousemove',
                            action: 'association:highlight',
                            arg: { linkField: 'area' }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              {
                type: 'line',
                region: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.95 } },
                options: {
                  data: data.line,
                  xField: 'time',
                  yField: 'value',
                  seriesField: 'area',
                  interactions: [{ type: 'element-highlight-by-color' }],
                  line: {},
                  point: { style: { r: 2.5 } },
                  meta: {
                    time: { range: [0, 1] }
                  },
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
      const plot = this.plot
      plot?.update({
        tooltip: {
          showCrosshairs: false,
          shared: false
        }
      })
      const chartLine = plot?.chart.views[1]
      const data = chartLine.filteredData || []
      const point = chartLine.getXY(last(data.filter(d => d.value === 281985)))
      plot.chart.unlockTooltip()
      plot.chart.showTooltip(point)
      plot.chart.lockTooltip()
    }
  }
}
</script>