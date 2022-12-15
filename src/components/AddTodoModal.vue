<template>
  <b-modal ref="add-todo" hide-footer title="Add New Todo" @close="$emit('close')">
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
        <b-form-select
          id="input-3"
          v-model="newTodo.assignee"
          :options="assignees"
          class="margin-y"
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-4" label="Please select project" label-for="input-4">
        <b-form-select
          id="input-4"
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
</template>

<script>

import { BButton, BModal, BForm, BFormSelect } from 'bootstrap-vue';

export default {
  name: 'AddTodoModal',
  components: { BButton, BModal, BForm, BFormSelect, },
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
    showTodosModal(t) {
      this.$refs['add-todo'].show();
    },
    hideTodosModal() {
      this.$refs['add-todo'].hide();
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