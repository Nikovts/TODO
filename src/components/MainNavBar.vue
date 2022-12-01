<template>
  <b-navbar type="dark" variant="primary" class="main-navbar">
    <b-navbar-brand to="/">Gravity Marketing Assignment</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/projects">Projects</b-nav-item>
      <b-nav-item to="/todos">Todos</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>
        Nikovts
      </b-nav-text>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { BNavbar } from 'bootstrap-vue';

export default {
  components: { BNavbar }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-navbar {
  &.navbar{
    padding: 0.5rem 1rem;
  }
}
.ml-auto {
  margin-left: auto;
}


</style>
