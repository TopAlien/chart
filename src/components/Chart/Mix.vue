<!--
 * @Author       : bo.wang
 * @Date         : 2022-08-31 19:50:24
 * @LastEditors  : bo.wang
 * @LastEditTime : 2022-08-31 22:12:53
 * @Description  : 请填写简介
-->
<template>
  <div id="cmix">
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
          const plot = new Mix('cmix', {
            tooltip: false,
            plots: [
              {
                type: 'line',
                region: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.95 } },
                options: {
                  data: data.line,
                  xField: 'time',
                  yField: 'value',
                  interactions: [{type: 'association-highlight'},],
                  seriesField: 'area',
                  line: {},
                  point: { style: { r: 2.5 } },
                  meta: {
                    time: { range: [0, 1] }
                  },
                  // smooth: true,
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
        })
    }
  }
}
</script>