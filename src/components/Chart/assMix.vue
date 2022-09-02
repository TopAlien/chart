<template>
  <div id="assMix"></div>
</template>

<script>
import { Mix } from '@antv/g2plot'
import { debounce, last } from '@antv/util'

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
            legend: {
              position: 'bottom'
            },
            autoFit: true,
            plots: [
              {
                type: 'pie',
                region: { start: { x: 0.5, y: 0.5 }, end: { x: 1.2, y: 0.25 } },
                options: {
                  data: [
                    {
                      area: '华东',
                      bill: 1
                    },
                    {
                      area: '中南',
                      bill: 1
                    },
                    {
                      area: '东北',
                      bill: 1
                    },
                    {
                      area: '华北',
                      bill: 1
                    },
                    {
                      area: '西南',
                      bill: 1
                    },
                    {
                      area: '西北',
                      bill: 1
                    }
                  ],
                  angleField: 'bill',
                  colorField: 'area',
                  tooltip: null,
                  statistic: null,
                  radius: 1,
                  innerRadius: 0.84,
                  state: {
                    active: {
                      style: {
                        lineWidth: 0
                      }
                    }
                  },
                  interactions: [
                    { type: 'element-active' },
                    {
                      type: 'element-selected',
                      cfg: {
                        start: [
                          {
                            trigger: 'element:click',
                            action: ['association:reset', 'association:highlight'],
                            arg: { linkField: 'area' }
                          }
                        ],
                        end: [
                          {
                            trigger: 'element:dblclick',
                            action: 'association:reset',
                            arg: { linkField: 'area' }
                          }
                        ]
                      }
                    }
                    // {
                    //   type: 'association-highlight',
                    //   cfg: {
                    //     start: [
                    //       {
                    //         trigger: 'element:click',
                    //         action: 'association:highlight',
                    //         arg: { linkField: 'area' }
                    //       }
                    //     ],
                    //     end: [
                    //       {
                    //         trigger: 'element:dblclick',
                    //         action: 'association:reset',
                    //         arg: { linkField: 'area' }
                    //       },
                    //       {
                    //         trigger: 'element:click',
                    //         action: ['association:reset', 'association:highlight'],
                    //         arg: { linkField: 'area' }
                    //       }
                    //     ]
                    //   }
                    // }
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

          // plot.setState(
          //   'active',
          //   data => {
          //     console.log(data)
          //     return data.area === '华东'
          //   },
          //   true
          // )
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
      const chartLine = plotChart?.views[1]
      const data = chartLine.filteredData || []

      this.drawTip2(data, chartLine, plotChart)

      plotChart.on('slider:mousemove', () => {
        this.drawTip2(data, chartLine, plotChart)
      })
      window.onresize = () => {
        this.drawTip2(data, chartLine, plotChart)
      }
    },
    drawTip2(data, chartLine, plotChart, value = 281985) {
      const point = chartLine.getXY(last(data.filter(d => d.value === value)))
      if (plotChart.isPointInPlot(point)) {
        plotChart.showTooltip(point)
      } else {
        plotChart.hideTooltip()
      }
      plotChart.lockTooltip()
    }
  }
}
</script>
