<template>

  <!-- <vue-final-modal v-model="showModal" name="example">
    <template #title>$vfm.show</template>
    <template #default="{ params }">
      Hi {{ params.userName }}
    </template>
  </vue-final-modal> -->

  <transition name="bounce" mode="out-in" >
    <custom-modal v-if="showModal" @close="closeModal">
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
    </custom-modal>
  </transition>
    <!-- <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <button class="modal__close" @click="showModal.value = false">

      </button>
      <span class="modal__title">Hello, vue-final-modal</span>
      <div class="modal__content">
        <p >
          Vue Final Modal is a renderless, stackable, detachable and lightweight modal component.
        </p>
      </div>
    </vue-final-modal> -->


  <!-- <b-modal v-model="modalShow" hide-footer title="Add New Project" @close="$emit('close')">
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
  </b-modal> -->

</template>

<script>

import { BButton, BForm} from 'bootstrap-vue';
import { ref, onMounted, inject, computed } from 'vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal';
import CustomModal from './CustomModal.vue'
export default {
  name: 'AddProjectModal',
  components: { BButton, BForm, VueFinalModal, ModalsContainer, CustomModal},
  compatConfig: { RENDER_FUNCTION: false,
                  COMPONENT_V_MODEL: false
                },
  emits:['close'],
  setup(props, {emit}) {

    let showModal = ref(true) ;

    const closeModal = () => {
      showModal.value = false;
      emit('close');
    }

    return { showModal, closeModal };
  },

  data(){
    return{
      newProject: {
        name: '',
        todos: [],
      },
    }
  },
  // mounted() {
  //   this.showProjectModal();
  // },
  methods: {


    onSubmit(event) {
      event.preventDefault();

      let projects=JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : [];
      this.newProject.id = projects.length + 1;
      projects.push(this.newProject);
      localStorage.setItem('projects',JSON.stringify(projects));

      this.$emit('addProject');
      this.showModal = false;
      this.newProject.name = '';
    },
    onReset(event) {
      event.preventDefault();
      this.newProject.name = '';
    },
  }

}
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>