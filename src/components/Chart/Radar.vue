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
            seriesField: 'user',
            smooth: true,
            meta: {
              score: {
                alias: '分数',
                min: 0,
                max: 80
              }
            },
            lineStyle: {
              lineWidth: 2,
              cursor: 'pointer'
            },
            xAxis: {
              line: null,
              tickLine: null,
              top: true,
              grid: {
                line: {
                  style: {
                    stroke: 'white',
                    lineWidth: 3,
                    lineDash: null,
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
                closed: true,
                line: {
                  style: {
                    stroke: 'rgb(220,227,246)',
                    cursor: 'pointer',
                  }
                },
                alternateColor: ['rgb(220,227,246)']
              }
            },
            point: {
              size: 2
            }
          })
          radarPlot.render()
        })
    }
  }
}
</script>
