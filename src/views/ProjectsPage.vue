<template>
  <div class="projects">
    <b-modal ref="add-project" hide-footer title="Add New Project">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Project name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="newProject.name"
            placeholder="Enter project name"
            required
            class="margin-y"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="add-todo" hide-footer title="Add New Todo">
      <b-form @submit="onSubmitTodo" @reset="onResetTodo">
        <b-form-group id="input-group-1" label="Todo name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="newTodo.name"
            placeholder="Enter todo name"
            required
            class="margin-y"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Todo description:" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="newTodo.description"
            placeholder="Enter todo description"
            required
            class="margin-y"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <div >
      <div v-if="projects.length > 0" class="px-3">
        <div class="header">
          <h2>Projects</h2>
          <b-button variant="primary" @click="showProjectModal">Add project</b-button>
        </div>
        <b-table striped hover :items="projects" :fields="fields" :fixed="true" table-variant="primary" class="table">
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
          <b-button variant="primary" @click="showProjectModal">Add project</b-button>
        </b-card>
      </div>

    </div>

  </div>
</template>

<script>

import { BButton, BCard, BModal, BForm, BTable } from 'bootstrap-vue';
export default {
  name: 'Projects',
  components: { BButton, BCard, BModal, BForm, BTable},
  data(){
    return{
      fields: ['id','name', 'todos'],
      projects: [],
      todos: [],
      newProject: {
        name: '',
        todos: []
      },
      newTodo: {
        id:'',
        name: '',
        user: 'User',
        description: '',
        projectId: '',
        projectName: '',
        state: 'Todo',
        viewed: 0
      }
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
      this.newTodo.projectId = project.id;
      this.newTodo.projectName = project.name;
      this.$refs['add-todo'].show();
    },
    hideTodosModal() {
      this.$refs['add-todo'].hide();
    },
    showProjectModal() {
      this.$refs['add-project'].show();
     },
    hideProjectModal() {
        this.$refs['add-project'].hide();
    },
    onSubmit(event) {
      event.preventDefault();

      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.newProject.id = this.projects.length + 1;
      this.projects.push(this.newProject)
      localStorage.setItem('projects',JSON.stringify(this.projects));

      this.hideProjectModal();
      this.newProject.name = '';
      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];

      this.setProjects();
    },
    onReset(event) {
      event.preventDefault();
      this.newProject.name = '';
    },
    onSubmitTodo(event) {
      event.preventDefault();

      let lastId = 0;
      this.todos[this.todos.length-1] ? lastId=this.todos[this.todos.length-1].id : null;
      this.newTodo.id = lastId+ 1;
      this.todos.push(this.newTodo);
      localStorage.setItem('todos',JSON.stringify(this.todos));

      this.hideTodosModal();
      this.newTodo.id = '';
      this.newTodo.name = '';
      this.newTodo.projectId = '';
      this.newTodo.projectName ='';
      this.newTodo.description = '';

      this.projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.todos=JSON.parse(localStorage.getItem('todos')) ?  JSON.parse(localStorage.getItem('todos')) : [];
      this.setProjects();
    },
    onResetTodo(event) {
      event.preventDefault();
      this.newTodo.id = '';
      this.newTodo.name = '';
      this.newTodo.description = '';
    },
    onRowSelected(items) {
      this.$router.push({name: 'TodoViewPage', params: { id: items[0].id }});
    },
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