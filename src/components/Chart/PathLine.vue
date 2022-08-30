<template>
  <div
    id="pathLine"
    style="height: 400px"
  ></div>
</template>

<script>
import echarts from './echarts.js'

export default {
  data() {
    return {
      data: [
        [-0.01924692542594, 0.0223482204551972],
        [-0.015621769022691799, 0.0191266317056152],
        [0.06710618828125879, 0.1095982606827],
        [-0.028337261854804802, 0.11423232918637499],
        [-0.0871422000583528, 0.07358963966175701],
        [-0.055467902009567, -0.00255668064265039],
        [-0.10051443422026399, 0.00938210687782712],
        [-0.027103516947459598, 0.13859841189929198],
        [0.0283696406489728, 0.011761297148899001],
        [0.07699225108714769, 0.08678163002776959],
        [-0.102553564086079, 0.128658386570276],
        [-0.101596047395611, 0.12867426794113201],
        [-0.10062275065713, 0.128722009617306],
        [-0.0996228782347437, 0.128796620502057]
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
      var chartDom = document.getElementById('pathLine')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          top: 30,
          left: 'center',
          text: '哇咔咔轨迹'
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.data,
            type: 'line',
            // sampling: 'lttb',
            symbol: 'none'
          },
          {
            data: [
              [-0.12, -0.08],
              [0.05, -0.17],
              [0.14, 0.05],
              [0.1, 0.2],
              [-0.14, 0.15],
              [-0.17, 0.05],
              [-0.12, -0.08]
            ],
            type: 'line',
            // sampling: 'lttb',
            areaStyle: {
              color: '#4B75D6',
              opacity: 0.2
            },
            lineStyle: {
              color: '#FF4400',
              width: 1,
              type: 'dashed'
            },
            symbol: 'none'
          }
        ]
      }

      window.onresize = function () {
        myChart.resize()
      }
      option && myChart.setOption(option)

      this.$once('hook:destroyed', () => {
        myChart?.destroy()
      })
    }
  }
}
</script>