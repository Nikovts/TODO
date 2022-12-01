<template>
  <b-modal ref="add-project" hide-footer title="Add New Project" @close="$emit('close')">
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
</template>

<script>

import { BButton, BModal, BForm} from 'bootstrap-vue';
export default {
  name: 'AddProjectModal',
  components: { BButton, BModal, BForm},
  data(){
    return{
      newProject: {
        name: '',
        todos: []
      },
    }
  },
  mounted() {
    this.showProjectModal();
  },
  methods: {
    showProjectModal() {
      this.$refs['add-project'].show();
     },
    hideProjectModal() {
      this.$refs['add-project'].hide();
    },
    onSubmit(event) {
      event.preventDefault();

      let projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.newProject.id = projects.length + 1;
      projects.push(this.newProject);
      localStorage.setItem('projects',JSON.stringify(projects));

      this.$emit('addProject');
      this.hideProjectModal();
      this.newProject.name = '';
    },
    onReset(event) {
      event.preventDefault();
      this.newProject.name = '';
    },
  }

}
</script>

<style>

</style>