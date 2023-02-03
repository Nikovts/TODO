<template>
  <b-navbar type="dark" variant="primary" class="main-navbar">
    <div class="navbar-brand" @click="$router.push('/')" >Gravity Marketing Assignment</div>
    <b-navbar-nav class="navbar-links">
      <div @click="$router.push('/projects')" class="navbar-brand nav-size">Projects</div>
      <div @click="$router.push('/todos')" class="navbar-brand nav-size">Todos</div>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-text class="navbar-brand">
        Nikovts
      </b-nav-text>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavItem, BNavbarNav, BNavText } from 'bootstrap-vue';

export default {
  components: { BNavbar,BNavbarBrand, BNavItem, BNavbarNav, BNavText },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-navbar {
  &.navbar{
    padding: 0.5rem 1rem;
  }
}
.navbar-brand{
    color:#ebedf0;
    cursor: pointer;
  &.nav-size {
    font-size: 1rem;
  }
}


.navbar-links {
  margin-left: 2rem;
  align-items: center;
}
.ml-auto {
  margin-left: auto;
}


</style>
