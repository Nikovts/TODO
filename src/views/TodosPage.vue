<template>
  <div class="todos">
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
        <b-form-group id="input-group-3" label="Please select project" label-for="input-3">
          <b-form-select
            id="input-2"
            v-model="selectedProject"
            :options="options"
            required
            class="margin-y"
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <div>
      <div v-if="todos.length > 0" class="px-3">
        <div class="header">
          <h2>Todos</h2>
          <b-button variant="primary" @click="showTodosModal">Add todo</b-button>
        </div>
        <b-table
          striped
          hover
          :items="todos"
          :fixed="true"
          table-variant="primary"
          class="table"
          selectable
          @row-selected="onRowSelected"
        ></b-table>
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
            <b-button variant="primary" @click="showTodosModal">Add todo</b-button>
          </div>
          <div v-else>
            <b-card-text class="no-todos-card-text"> You have no todos and projects yet. </b-card-text>
            <b-card-text > To cteate new todo, first you have to create project.</b-card-text>
            <b-button variant="primary" @click="showProjectModal">Add project</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton, BCard, BModal, BForm, BTable } from 'bootstrap-vue';
export default {
  name: 'Todos',
  components: { BButton, BCard, BModal, BForm, BTable},
  data(){
    return{
      fields: ['id','name', 'todos'],
      projects: [],
      todos: [],
      options: [],
      selectedProject:{},
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
    showTodosModal(t) {
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

      this.newTodo.projectId = this.selectedProject.id;
      this.newTodo.projectName = this.selectedProject.name;

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

      this.newTodo.name = '';
      this.newTodo.description = '';
      this.selectedProject = {};
    },
    onRowSelected(items) {
      this.$router.push({name: 'TodoViewPage', params: { id: items[0].id }});
    },
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
