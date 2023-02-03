import { createRouter, createWebHistory} from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';
import TodosPage from '../views/TodosPage.vue';
import ProjectsPage from '../views/ProjectsPage.vue';
import TodoViewPage from '../views/TodoViewPage.vue'

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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
