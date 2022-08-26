<template>
  <div id="app">
    <G2RadarBase></G2RadarBase>
    <CalendarGithub></CalendarGithub>
    <CalendarHeatMap></CalendarHeatMap>
    <Radar></Radar>
    <PathLine></PathLine>
  </div>
</template>

<script>
import CalendarGithub from './components/Chart/CalendarGithub'
import G2RadarBase from './components/Chart/G2RadarBase'
import CalendarHeatMap from './components/Chart/CalendarHeatMap'
import PathLine from './components/Chart/PathLine'
import Radar from './components/Chart/Radar'
export default {
  name: 'App',
  components: {
    CalendarGithub,
    G2RadarBase,
    CalendarHeatMap,
    PathLine,
    Radar
  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
