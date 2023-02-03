<template>
  <div class="home">
    <div class="home-container ">
      <b-card
          header="Todo manager"
          border-variant="light"
          class="no-projects-card"
          header-bg-variant="primary"
          header-text-variant="white"
          header-class="no-projects-card-header"
          align="center"
        >
          <b-card-text class="no-projects-card-text"> This is a Todo manager app, where you can make projects and create and manage todo’s in the project.</b-card-text>
          <hr class="my-4"/>
          <b-card-text class="no-projects-card-text">  You can view currently available projects and tasks, as well as create new ones.</b-card-text>

          <div class="home-buttons">
            <b-button variant="primary" @click="$router.push('/projects')">Projects</b-button>
            <b-button variant="primary" @click="$router.push('/todos')">Todos</b-button>
          </div>

        </b-card>

    </div>
  </div>
</template>

<script>

import { BButton } from 'bootstrap-vue';

export default {
  name: 'Dashboard',
  components: {
    BButton
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
  .home-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .home-buttons{
    display: flex;
    margin-top: 3rem;
    justify-content: center;
  }
  .no-projects-card {

      .no-projects-card-header {
        font-size: 2rem;
      }
      .no-projects-card-text {
        margin-top: 2.5rem;
      }
    }
</style>