<template>
  <div id="app">
    <Dropzone />
    <DownloadFiles /> 
  </div>
</template>

<script>
import DownloadFiles from './components/DownloadFiles.vue'
import Dropzone from './components/Dropzone.vue'

export default {
  name: 'App',
  components: {
    DownloadFiles,
    Dropzone
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
