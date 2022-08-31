<template>
  <div>
    <div style="display: flex; align-items: center;">
      <div style="flex: 1">
        <div id='containerGithub'></div>
      </div>
      <div>
        <!-- <div
          v-for="item in date"
          :key="item"
          @click="handleDate(item)"
          class="date_item"
        >{{ item }}</div> -->
      </div>
    </div>
    <div class="legend">
      <div
        v-for="item in legends"
        :key="item.color"
        class="legend_item"
        :style="{backgroundColor: item.color}"
      >{{ item.label }}</div>
    </div>
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
      date: ['2020', '2021', '2022', '2023'],
      queryYear: null,
      legends: [
        {
          label: '1-10',
          color: '#9be9a8'
        },
        {
          label: '11-20',
          color: '#40c463'
        },
        {
          label: '21-30',
          color: '#30a14e'
        },
        {
          label: '30+',
          color: '#216e39'
        }
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
      this.plot = new P(
        'containerGithub',
        {
          autoFit: true,
          useDeferredLabel: true,
          height: 150,
          data
        },
        adaptor,
        defaultOptions
      )

      this.plot?.render()

      this.$once('hook:destroyed', () => {
        this.plot?.destroy()
      })
    },
    handleDate(date) {
      if (date === this.queryYear) return

      this.queryYear = date
      this.plot?.update({
        queryYear: date
      })
    }
  }
}
</script>

<style scoped>
.date_item {
  background-color: cadetblue;
  color: white;
  padding: 4px 10px 4px;
  margin-right: 10px;
  margin: 0 0 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.legend {
  display: flex;
  margin-bottom: 14px;
}
.legend_item {
  padding: 2px 12px 2px;
  margin-right: 10px;
  font-size: 12px;
  border-radius: 6px;
  color: white;
}
</style>