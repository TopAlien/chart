<template>
  <div id="containerMLine"></div>
</template>

<script>
import { Line } from '@antv/g2plot'

export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
        .then(res => res.json())
        .then(data => {
          const linePlot = new Line('containerMLine', {
            data,
            xField: 'year',
            autoFit: true,
            yField: 'gdp',
            seriesField: 'name',
            useDeferredLabel: 1000,
            // interactions: [{ type: 'element-highlight-by-color' }],
            yAxis: {
              label: {
                formatter: v => `${(v / 10e8).toFixed(1)} B`
              }
            },
            tooltip: {
              follow: true,
              enterable: true,
              offset: 18,
              shared: true,
              marker: { lineWidth: 0.5, r: 3 }
            },
            legend: {
              position: 'top'
            },
            smooth: true,
            point: {
              size: 2
            },
            slider: {}
          })
          linePlot.render()

          linePlot.setState('active', data => data.gdp === 4594306848763.08 && data.name === 'China', true)
        })
    }
  }
}
</script>