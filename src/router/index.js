import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';
import TodosPage from '../views/TodosPage.vue';
import ProjectsPage from '../views/ProjectsPage.vue';
import TodoViewPage from '../views/TodoViewPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'DashboardPage',
    component: DashboardPage,
  },
  {
    path: '/todos',
    name: 'TodosPage',
    component: TodosPage,
  },
  {
    path: '/projects',
    name: 'ProjectsPage',
    component: ProjectsPage,
  },
  {
    path: '/todo/:id',
    name: 'TodoViewPage',
    component: TodoViewPage,
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
