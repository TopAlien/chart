<template>
  <div id="calendarHeadMap"></div>
</template>
<script>
import { Heatmap, G2 } from '@antv/g2plot'

export default {
  created() {
    this.init()
  },
  methods: {
    init() {
      G2.registerShape('polygon', 'boundary-polygon', {
        draw(cfg, container) {
          const group = container.addGroup()
          const attrs = {
            stroke: '#fff',
            lineWidth: 1,
            fill: cfg.color,
            paht: []
          }
          const points = cfg.points
          const path = [
            ['M', points[0].x, points[0].y],
            ['L', points[1].x, points[1].y],
            ['L', points[2].x, points[2].y],
            ['L', points[3].x, points[3].y],
            ['Z']
          ]

          attrs.path = this.parsePath(path)
          group.addShape('path', {
            attrs
          })

          if (cfg.data.lastWeek) {
            const linePath = [
              ['M', points[2].x, points[2].y],
              ['L', points[3].x, points[3].y]
            ]
            // 最后一周的多边形添加右侧边框
            group.addShape('path', {
              attrs: {
                path: this.parsePath(linePath),
                lineWidth: 4,
                stroke: '#404040'
              }
            })
            if (cfg.data.lastDay) {
              group.addShape('path', {
                attrs: {
                  path: this.parsePath([
                    ['M', points[1].x, points[1].y],
                    ['L', points[2].x, points[2].y]
                  ]),
                  lineWidth: 4,
                  stroke: '#404040'
                }
              })
            }
          }
          return group
        }
      })

      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json')
        .then(res => res.json())
        .then(data => {
          const heatmapPlot = new Heatmap(document.getElementById('calendarHeadMap'), {
            data,
            height: 170,
            autoFit: true,
            xField: 'week',
            yField: 'day',
            colorField: 'commits',
            useDeferredLabel: true,
            reflect: 'y',
            shape: 'boundary-polygon',
            meta: {
              day: {
                type: 'cat',
                values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
              },
              week: {
                type: 'cat'
              },
              commits: {
                sync: true
              },
              date: {
                type: 'cat'
              }
            },
            yAxis: {
              grid: null
            },
            tooltip: {
              title: 'date',
              showMarkers: false
            },
            interactions: [{ type: 'element-active' }],
            xAxis: {
              position: 'top',
              tickLine: null,
              line: null,
              label: {
                offset: 12,
                style: {
                  fontSize: 12,
                  fill: '#666',
                  textBaseline: 'top'
                },
                formatter: val => {
                  if (val === '2') {
                    return '5月'
                  } else if (val === '6') {
                    return '6月'
                  } else if (val === '10') {
                    return '7月'
                  } else if (val === '14') {
                    return '8月'
                  } else if (val === '20') {
                    return '9月'
                  } else if (val === '24') {
                    return '10月'
                  }
                  return ''
                }
              }
            }
          })
          heatmapPlot.render()
        })
    }
  }
}
</script>