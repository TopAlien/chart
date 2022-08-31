<template>
  <div id="assMix">
  </div>
</template>

<script>
import { Mix } from '@antv/g2plot'

export default {
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

          // 如果左轴是折线
          // const x = plot.chart.views[0].getElements()[1].shape.getBBox().maxX
          // console.log(plot.chart.views[1])
          // console.log(x)
          // plot.chart.showTooltip({ x, y: 0 })

          // 如果右轴是折线
          // const x = dualAxes.chart.views[1].getElements()[0].shape.getBBox().maxX;
          // dualAxes.chart.showTooltip({ x, y: 0 });

          // 如果左轴是柱状图
          // const elements = dualAxes.chart.views[0].getElements();
          // const lastBox = elements[elements.length - 1].shape.getBBox();
          // const x = lastBox.x+lastBox.width/2;
          // dualAxes.chart.showTooltip({ x, y: 0 });
        })
    }
  }
}
</script>