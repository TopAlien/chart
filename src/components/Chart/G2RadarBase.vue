<template>
  <div id="g2RadarBase"></div>
</template>

<script>
import { Radar } from '@antv/g2plot'

export default {
  data() {
    return {
      data: [
        { name: '摆动速度', score: 15 },
        { name: '摆动短袖', score: 11 },
        { name: '摆动长轴', score: 15 },
        { name: 'COP短袖', score: 4 },
        { name: 'COP长袖', score: 12 },
        { name: '摆动面积', score: 8 }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      const radarPlot = new Radar('g2RadarBase', {
        data: this.data,
        xField: 'name',
        yField: 'score',
        meta: {
          score: {
            alias: '分数',
            min: 0,
            max: 20
          }
        },
        xAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null
              }
            }
          }
        },
        yAxis: {
          line: null,
          tickLine: null,
          tickCount: 3,
          label: null,
          grid: {
            line: {
              type: 'line',
              style: (x, y) => {
                return {
                  stroke: y === 1 ? 'red' : 'gray',
                  lineDash: y === 1 ? [3, 2] : null
                }
              }
            }
          }
        },
        area: {
          style: {
            fill: 'black',
            fillOpacity: 1
          }
        }
      })
      radarPlot?.render()
      
      this.$once('hook:destroyed', () => {
        radarPlot?.destroy()
      })
    }
  }
}
</script>