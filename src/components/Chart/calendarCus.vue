<!--
 * @Author       : bo.wang
 * @Date         : 2022-08-31 19:54:27
 * @LastEditors  : bo.wang
 * @LastEditTime : 2022-08-31 20:01:19
 * @Description  : 请填写简介
-->
<template>
  <div>
    <CalendarHeatmap :values="list" end-date="2020-01-01" :tooltip="true" :vertical="false" />
  </div>
</template>

<script>
import { CalendarHeatmap } from 'vue-calendar-heatmap'

export default {
  components: {
    CalendarHeatmap
  },
  data(){
    return {
      list: [
        {
          date: '2019-9-22',
          count: 1,
        },
        {
          date: '2019-9-02',
          count: 6,
        },
        {
          date: '2019-9-12',
          count: 11,
        }
      ]
    }
  },
}
</script>