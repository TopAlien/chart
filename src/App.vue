<template>
  <div id="app">
    <CalendarCus></CalendarCus>
    <G2RadarBase></G2RadarBase>
    <AssMix></AssMix>
    <CalendarGithub></CalendarGithub>
    <CalendarHeatMap></CalendarHeatMap>
    <Radar></Radar>
    <MLine></MLine>
    <PathLine></PathLine>
    <Mix></Mix>
  </div>
</template>

<script>
import CalendarCus from './components/Chart/calendarCus'
import AssMix from './components/Chart/assMix'
import Mix from './components/Chart/Mix'
import MLine from './components/Chart/MLine'
import CalendarGithub from './components/Chart/CalendarGithub'
import G2RadarBase from './components/Chart/G2RadarBase'
import CalendarHeatMap from './components/Chart/CalendarHeatMap'
import PathLine from './components/Chart/PathLine'
import Radar from './components/Chart/Radar'
export default {
  name: 'App',
  components: {
    CalendarCus,
    AssMix,
    Mix,
    MLine,
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
