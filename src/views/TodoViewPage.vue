<template>
  <div class="todo">
    <b-card
      :header="todo.name"
      border-variant="light"
      class="todo-card"
      header-bg-variant="primary"
      header-text-variant="white"
      header-class="todo-card-header"

    >
      <h5 v-if="index === -1">There is no Todo with ID {{$route.params.id}}</h5>
      <div v-else class="flex">

        <div class="todo-card-text-description">
          <h5 class="todo-card-text-key "> Description</h5>
          <p class="todo-card-text-description-text"> {{todo.description}}</p>
          <div class="todo-card-text">
            <span> Delete todo <span class="todo-card-text-key ">{{todo.name}}</span></span>
            <span class="todo-card-text-value"> <b-button variant="danger" @click="deleteTodo">DELETE</b-button></span>
          </div>
        </div>
        <div class="todo-card-details">
          <div class="flex">
            <h6>Details</h6>
            <select
              v-model="todo.state"
              size="sm"
              @change="changeState"
              style="color:white; width: 50%;"
              :class="todo.state === 'Todo' ? 'bg-primary': 'bg-success'"
            >
            <option class="bg-info" value="Todo">To Do</option>
            <option class="bg-info" value="Done">Done</option>
            </select>
          </div>
          <hr class="my-2">
          <div class="todo-card-text">
            <span class="todo-card-text-key"> ID</span>
            <span class="todo-card-text-value"> {{todo.id}}</span>
          </div>
          <div class="todo-card-text">
            <span class="todo-card-text-key"> Assignee</span>
            <span class="todo-card-text-value"> {{todo.assignee}}</span>
          </div>
          <div class="todo-card-text">
            <span class="todo-card-text-key"> Project Name</span>
            <span class="todo-card-text-value"> {{todo.projectName}}</span>
          </div>
          <div class="todo-card-text">
            <span class="todo-card-text-key"> Viewed</span>
            <span class="todo-card-text-value"> {{todo.viewed}}</span>
          </div>
          <div class="todo-card-text">
            <span class="todo-card-text-key"> Created</span>
            <span class="todo-card-text-value"> {{new Date(todo.created).toLocaleDateString("en-GB")}}</span>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>

import { BButton, BCard, BFormSelect} from 'bootstrap-vue';
export default {
  name: 'TodoView',
  components: { BButton, BCard, BFormSelect},
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
      index: '',
      stateOptions: [
        {
          value: 'Done',
          text: 'DONE'
        },
        {
          value: 'Todo',
          text: 'TODO'
        },
      ]
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
    changeState(event) {
      this.todos[this.index].state = event.target.value;
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
    width: 45rem;
    margin-top: 12rem;
    .todo-card-header {
      font-size: 2rem;
      display: flex;
    }
    .flex {
      display: flex;
      padding: 0;
    }
    .todo-card-text {
      margin-top: 1rem;
      display: flex;
      align-items: flex-end;

      .todo-card-text-key {
        font-weight: 700;
        width: 50%;
        text-align: start;
      }
      .todo-card-text-value {
        margin-left: 0.5rem;
        width: 50%;
        text-align: start;
      }
    }
    .todo-card-text-description {
      width: 60%;
      display: flex;
      flex-direction: column;
      .todo-card-text {
        margin-top: auto;
        display: flex;
        align-items: flex-end;
      }
      .todo-card-text-description-text {
        background-color: lightgray;
        height: 80%;
        margin-right: 1rem;
        border-radius: calc(0.375rem - 1px);
        margin-top: 0.25rem;
        padding-left: 0.5rem;
      }
      .todo-card-text-key {
        font-weight: 700;
      }
      .todo-card-text-value {
        margin-left: 1rem;
        width: auto;
        text-align: start;
        margin-right: 1rem;
      }
    }
    .todo-card-details {
      width: 40%;
      .flex {
        display: flex;
        justify-content: space-between;
        padding: 0;
        align-items: baseline;
      }
    }
  }
}
</style>