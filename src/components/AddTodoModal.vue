<template>
  <transition name="bounce" mode="out-in" >
    <custom-modal v-if="showModal" @close="hideTodosModal">
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
      <b-form-group id="input-group-3" label="Assign to" label-for="input-3">
        <select
          id="input-3"
          v-model="newTodo.assignee"
          class="margin-y form-select"
          required
        >
          <!-- <option v-if="newTodo.assignee === 'Unassigned'" value="Unassigned">Please choose an User</option> -->
          <option v-for="user,i in assignees" :key="i" :value="user">{{user}}</option>
        </select>
      </b-form-group>
      <b-form-group id="input-group-4" label="Select project" label-for="input-4">
        <select
          id="input-4"
          v-model="selectedProject"
          required
          class="margin-y form-select"
        >
          <!-- <option v-if="newTodo.assignee === 'Unassigned'" value="Unassigned">Please select project</option> -->
          <option v-for="project,i in options" :key="i" :value="project.value">{{project.text}}</option>
        </select>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </custom-modal>
  </transition>
</template>

<script>
Unassigned
import { BButton, BModal, BForm, BFormSelect } from 'bootstrap-vue';
import CustomModal from './CustomModal.vue'
export default {
  name: 'AddTodoModal',
  components: { BButton, BModal, BForm, BFormSelect, CustomModal },
  data(){
    return{
      newTodo: {
        id:'',
        name: '',
        assignee: 'Unassigned',
        description: '',
        projectId: '',
        projectName: '',
        state: 'Todo',
        viewed: 0,
        created: ''
      },
      selectedProject:{},
      todos:[],
      assignees: [
        'User 1',
        'User 2',
        'User 3'
      ],
      showModal: false
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.todos=JSON.parse(localStorage.getItem('todos')) ?  JSON.parse(localStorage.getItem('todos')) : [];
    if (this.options.length === 1) {
      this.selectedProject = this.options[0];
    };
    this.showTodosModal();
  },
  methods: {
    showTodosModal() {
      this.showModal = true;
    },
    hideTodosModal() {
      this.showModal = false;
      this.$emit('close');
    },
    onSubmitTodo(event) {
      event.preventDefault();

      this.newTodo.projectId = this.selectedProject.id;
      this.newTodo.projectName = this.selectedProject.name;

      let lastId = 0;
      this.todos[this.todos.length-1] ? lastId=this.todos[this.todos.length-1].id : null;
      this.newTodo.id = lastId+ 1;
      this.newTodo.created = Date();
      this.todos.push(this.newTodo);
      localStorage.setItem('todos',JSON.stringify(this.todos));

      this.$emit('addTodo');
      this.hideTodosModal();
      this.newTodo.id = '';
      this.newTodo.name = '';
      this.newTodo.projectId = '';
      this.newTodo.projectName ='';
      this.newTodo.description = '';
      this.newTodo.assignee = 'Unassigned';
      this.newTodo.created = '';
    },
    onResetTodo(event) {
      event.preventDefault();

      this.newTodo.name = '';
      this.newTodo.description = '';
      this.selectedProject = {};
      this.newTodo.assignee = 'Unassigned';
    },
  }
}
</script>

<style>

</style>