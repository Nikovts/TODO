<template>
  <div class="projects">
    <add-project-modal v-if="openProjectModal" @addProject="addProject" @close="openProjectModal=false"/>
    <add-todo-modal v-if="openTodoModal" :options="options" @addTodo="addTodo" @close="openTodoModal=false,options=[]"/>
    <div>
      <div v-if="projects.length > 0" class="px-3">
        <div class="header">
          <h2>Projects</h2>
          <b-button variant="primary" @click="openProjectModal=true">Add project</b-button>
        </div>
        <b-table
          id="projects-table"
          :per-page="perPage"
          :current-page="currentPage"
          striped
          hover
          :items="projects"
          :fields="fields"
          :fixed="true"
          table-variant="primary"
          class="table"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
        >
          <template #cell(todos)='row'>
            <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="primary">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Todos
            </b-button>
          </template>
          <template #row-details="row">
            <div class="flex">
              <div v-if="row.item.todos.length === 0"  class="mr-2"> Project <em>{{row.item.name}}</em> have no todos yet </div>
              <b-button  size="sm" @click="showTodosModal(row.item)" variant="primary" class="ml-auto">
                Add todo
              </b-button>
            </div>
            <b-table striped hover small table-variant="info" :items="row.item.todos" :fixed="true" selectable  @row-selected="onRowSelected"></b-table>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="projects-table"
        ></b-pagination>
      </div>

      <div class="no-projects" v-if="projects.length === 0"  >
        <b-card
          header="Projects"
          border-variant="light"
          class="no-projects-card"
          header-bg-variant="primary"
          header-text-variant="white"
          header-class="no-projects-card-header"
          align="center"
        >
          <b-card-text class="no-projects-card-text"> You have no projects yet.</b-card-text>
          <b-button variant="primary" @click="openProjectModal=true">Add project</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

import { BButton, BCard, BTable, BPagination } from 'bootstrap-vue';
import AddProjectModal from '../components/AddProjectModal.vue';
import AddTodoModal from '../components/AddTodoModal.vue';

export default {
  name: 'Projects',
  components:  {BButton, BCard, BTable, BPagination, AddProjectModal, AddTodoModal},
  data(){
    return{
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'todos',
          sortable: false
        }
      ],
      perPage: 10,
      currentPage: 1,
      projects: [],
      todos: [],
      openProjectModal: false,
      openTodoModal: false,
      options: []
    }
  },
  created(){
    this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
    this.todos=JSON.parse(localStorage.getItem('todos')) ?  JSON.parse(localStorage.getItem('todos')) : [];
  },
  mounted() {
    this.setProjects();
  },
  methods: {
    setProjects() {
      this.todos.forEach(todo =>{
        let index = this.projects.findIndex(project =>
          project.id === todo.projectId
        );
        if (index != -1) {
          this.projects[index].todos.push(todo);
        };
      })
    },
    showTodosModal(project) {
      this.options.push({
        text: project.name,
        value: project
      });
      this.openTodoModal = true;
    },
    addTodo() {
      this.openTodoModal = false;
      this.options = [];
      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.todos=JSON.parse(localStorage.getItem('todos')) ?  JSON.parse(localStorage.getItem('todos')) : [];
      this.setProjects();
    },
    addProject() {
      this.openProjectModal = false;
      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.setProjects();
    },
    onRowSelected(items) {
      this.$router.push({name: 'TodoViewPage', params: { id: items[0].id }});
    },
  },
  computed: {
    rows() {
      return this.projects.length;
    }
  }
}
</script>

<style lang="scss">
  .projects {
    margin-top: 2rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
  }
  .no-projects{

    display: flex;
    justify-content: center;

    .no-projects-card {
      width: 40rem;
      height: 20rem;
      margin-top: 12rem;
      .no-projects-card-header {
        font-size: 2rem;
      }
      .no-projects-card-text {
        margin-top: 5rem;
      }
    }

  }
  .margin-y {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
  .mr-2 {
    margin-right: 1rem;
  }
  .flex {
    display: flex;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;

  }
  .ml-auto {
    margin-left: auto;
  }
  .table {
    td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 1px;
    }
  }
</style>