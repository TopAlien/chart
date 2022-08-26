<template>
  <div>
    <div id='containerGithub'></div>

    <div
      v-for="item in date"
      :key="item"
      @click="handleDate(item)"
      class="date_item"
    >{{ item }}</div>
  </div>
</template>

<script>
import { data } from './calendar.data'
import { P } from '@antv/g2plot'
import { defaultOptions, adaptor } from './calendar/src/index'

export default {
  data() {
    return {
      plot: null,
      date: ['2020', '2021', '2022', '2023']
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.plot = new P('containerGithub', {}, adaptor, {
        ...defaultOptions,
        width: 800,
        height: 150,
        autoFit: true,
        data
      })

      this.plot?.render()
    },
    handleDate(date) {
      this.plot?.update({
        queryYear: date
      })
    }
  }
}
</script>

<style scoped>
.date_item {
  display: inline-block;
  background-color: cadetblue;
  color: white;
  padding: 4px 10px 4px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>