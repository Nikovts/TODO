<template>
  <div id="app">
    <main-nav-bar/>
    <router-view/>
  </div>
</template>
<script>

import MainNavBar from "./components/MainNavBar.vue"

export default {
  components: { MainNavBar }
}
</script>


<style lang="scss">

body {

  padding: 0;
  margin: 0;
}

#app {

  height: 100vh;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;

  background-color: #ebedf0;

}
</style>
