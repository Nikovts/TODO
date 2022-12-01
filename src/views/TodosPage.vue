<template>
  <div class="todos">
    <add-project-modal v-if="openProjectModal" @addProject="addProject"  @close="openProjectModal=false"/>
    <add-todo-modal v-if="openTodoModal" :options="options" @addTodo="addTodo"  @close="openTodoModal=false"/>
    <div>
      <div v-if="todos.length > 0" class="px-3">
        <div class="header">
          <h2>Todos</h2>
          <b-button variant="primary" @click="openTodoModal=true">Add todo</b-button>
        </div>
        <b-table
          id="todos-table"
          :per-page="perPage"
          :current-page="currentPage"
          striped
          hover
          :items="todos"
          :fields="fields"
          :fixed="true"
          table-variant="primary"
          class="table"
          selectable
          @row-selected="onRowSelected"
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
        ></b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="todos-table"
        ></b-pagination>
      </div>

      <div class="no-todos" v-if="todos.length === 0"  >
        <b-card
          header="Todos"
          border-variant="light"
          class="no-todos-card"
          header-bg-variant="primary"
          header-text-variant="white"
          header-class="no-todos-card-header"
          align="center"
        >
          <div v-if="projects.length>0">
            <b-card-text class="no-todos-card-text"> You have no todos yet.</b-card-text>
            <b-button variant="primary" @click="openTodoModal=true">Add todo</b-button>
          </div>
          <div v-else>
            <b-card-text class="no-todos-card-text"> You have no todos and projects yet. </b-card-text>
            <b-card-text > To cteate new todo, first you have to create project.</b-card-text>
            <b-button variant="primary" @click="openProjectModal=true">Add project</b-button>
          </div>
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
  name: 'Todos',
  components: { BButton, BCard, BTable, BPagination, AddProjectModal, AddTodoModal},
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
          key: 'user',
          sortable: true
        },
        {
          key: 'description',
          sortable: false
        },
        {
          key: 'projectId',
          label: 'Project ID',
          sortable: true
        },
        {
          key: 'projectName',
          sortable: true
        },
        {
          key: 'state',
          sortable: true
        },
        {
          key: 'viewed',
          sortable: true
        },

      ],
      perPage: 10,
      currentPage: 1,
      projects: [],
      todos: [],
      options: [],
      openTodoModal: false,
      openProjectModal: false
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
      this.projects.forEach(project =>{
        this.options.push({
          text: project.name,
          value: project
        });
      });
      this.todos.forEach(todo =>{
        let index = this.projects.findIndex(project =>
          project.id === todo.projectId
        );
        if (index != -1) {
          this.projects[index].todos.push(todo);
        }
      });
    },
    addProject() {
      this.openProjectModal = false;
      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.setProjects();
    },
    addTodo() {
      this.openTodoModal = false;
      this.options = [];
      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.todos=JSON.parse(localStorage.getItem('todos')) ?  JSON.parse(localStorage.getItem('todos')) : [];
      this.setProjects();
    },
    onRowSelected(items) {
      this.$router.push({name: 'TodoViewPage', params: { id: items[0].id }});
    },
  },
  computed: {
    rows() {
      return this.todos.length;
    }
  }
};
</script>

<style lang="scss">
  .todos {
    margin-top: 2rem;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
  }
  .no-todos{

    display: flex;
    justify-content: center;

    .no-todos-card {
      width: 40rem;
      height: 20rem;
      margin-top: 12rem;
      .no-todos-card-header {
        font-size: 2rem;
      }
      .no-todos-card-text {
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

  .table {
    td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 1px;
    }
  }
</style>
