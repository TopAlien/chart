<!--
 * @Author       : bo.wang
 * @Date         : 2022-08-31 19:50:24
 * @LastEditors  : bo.wang
 * @LastEditTime : 2022-08-31 22:27:09
 * @Description  : 请填写简介
-->
<template>
  <div id="container" />
</template>

<script>
import { Radar } from '@antv/g2plot'

export default {
  created() {
    this.init()
  },
  methods: {
    init() {
      fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
        .then(data => data.json())
        .then(data => {
          const radarPlot = new Radar('container', {
            data,
            xField: 'item',
            yField: 'score',
            autoFit: true,
            seriesField: 'user',
            useDeferredLabel: true,
            smooth: true,
            meta: {
              score: {
                alias: '分数',
                min: 0,
                max: 80
              }
            },
            lineStyle: {
              lineWidth: 1.5,
              cursor: 'pointer',
              lineDash: [2, 5]
            },
            point: {
              size: 2,
            },
            xAxis: {
              line: null,
              tickLine: null,
              // top: true,
              grid: {
                line: {
                  style: {
                    stroke: '#E3E4E6',
                    lineWidth: 3,
                    cursor: 'pointer'
                  }
                }
              }
            },
            yAxis: {
              line: null,
              tickLine: null,
              tickCount: 2,
              label: false,
              grid: {
                line: {
                  style: {
                    stroke: 'rgba(220,227,246,.4)',
                    cursor: 'pointer'
                  }
                },
                alternateColor: ['rgba(220,227,246,.4)']
              }
            }
          })
          radarPlot?.render()

          this.$once('hook:destroyed', () => {
            radarPlot?.destroy()
          })
        })
    }
  }
}
</script>
