<template>
  <div class="home">
    <b-jumbotron>
      <template #header>Todo manager</template>
      <template #lead>
        This is a Todo manager app, where you can make projects and create and manage todo’s in the project.
      </template>
      <hr class="my-4">
      <p>
        You can view currently available projects and tasks, as well as create new ones.
      </p>
      <div class="home-buttons">
        <b-button variant="primary" to="/projects">Projects</b-button>
        <b-button variant="primary" to="/todos">Todos</b-button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>

import { BJumbotron, BButton } from 'bootstrap-vue';

export default {
  name: 'Dashboard',
  components: {
    BJumbotron, BButton
  },
};
</script>
<style  lang="scss">
  .home{
    margin-top: 10rem;
    text-align: center;
    .btn{
      margin:0 0.5rem;
    }
  }
  .home-buttons{
    display: flex;
    margin-top: 3rem;
    justify-content: center;
  }
</style>