<template>
  <div class="todo">
    <b-card
      :header="todo.name"
      border-variant="light"
      class="todo-card"
      header-bg-variant="primary"
      header-text-variant="white"
      header-class="todo-card-header"
      align="center"
    >
      <h5 v-if="index === -1">There is no Todo with ID {{$route.params.id}}</h5>
      <b-card-body v-else>


      <div class="todo-card-text description">
        <span class="todo-card-text-key"> Description:</span>
        <span class="todo-card-text-value"> {{todo.description}}</span>
      </div>
      <div class="todo-card-text">
        <span class="todo-card-text-key"> User:</span>
        <span class="todo-card-text-value"> {{todo.user}}</span>
      </div>
      <div class="todo-card-text">
        <span class="todo-card-text-key"> Project Name:</span>
        <span class="todo-card-text-value"> {{todo.projectName}}</span>
      </div>
      <div class="todo-card-text">
        <span class="todo-card-text-key"> State:</span>
        <span class="todo-card-text-value"> {{todo.state}}</span>
      </div>
      <div class="todo-card-text">
        <span class="todo-card-text-key"> Viewed:</span>
        <span class="todo-card-text-value"> {{todo.viewed}}</span>
      </div>
      <div class="todo-card-text" v-if="todo.state === 'Todo'">
        <span class="todo-card-text-key"> Mark state as Done:</span>
        <span class="todo-card-text-value"> <b-button variant="primary" @click="done">DONE</b-button></span>
      </div>
      <div class="todo-card-text">
        <span class="todo-card-text-key"> Delete todo <em>{{todo.name}}</em>:</span>
        <span class="todo-card-text-value"> <b-button variant="danger" @click="deleteTodo">DELETE</b-button></span>
      </div>
    </b-card-body>

    </b-card>
  </div>
</template>

<script>

import { BButton, BCard } from 'bootstrap-vue';
export default {
  name: 'TodoView',
  components: { BButton, BCard},
  data(){
    return{
      todos: [],
      projects: [],
      todo: {
        id:'',
        name: '',
        user: '',
        description: '',
        projectId: '',
        projectName: '',
        state: '',
        viewed: 0
      },
      index: ''
    }
  },
  created(){
    this.todos=JSON.parse(localStorage.getItem('todos')) ?  JSON.parse(localStorage.getItem('todos')) : [];
  },
  mounted(){
    this.setTodo();
  },
  methods: {
    setTodo() {
      this.index = this.todos.findIndex(todo =>
        todo.id == this.$route.params.id
      );
      if (this.index != -1) {
        this.todos[this.index].viewed++;
        localStorage.setItem('todos',JSON.stringify(this.todos));
        this.todo = this.todos[this.index];
      };
    },
    done() {
      this.todo.state = 'Done';
      this.todos[this.index].state = 'Done';
      localStorage.setItem('todos',JSON.stringify(this.todos));
    },
    deleteTodo() {
      this.todos.splice(this.index, 1);
      localStorage.setItem('todos',JSON.stringify(this.todos));
      this.$router.push('/todos');
    }
  }

}
</script>

<style lang="scss">

.todo{

  display: flex;
  justify-content: center;

  .todo-card {
    width: 35rem;
    margin-top: 12rem;
    .todo-card-header {
      font-size: 2rem;
    }
    .todo-card-text {
      margin-top: 1rem;
      display: flex;
      align-items: flex-end;

      .todo-card-text-key {
        font-weight: 700;
        width: 50%;
        text-align: end;
      }
      .todo-card-text-value {
        margin-left: 0.5rem;
        width: 50%;
        text-align: start;
      }
      &.description {
      align-items: flex-start;
    }
    }
  }
}
</style>