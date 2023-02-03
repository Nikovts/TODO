<template>
  <div>
      <div class="h-100 w-100 position-fixed main" @click="hide"></div>
      <div class="container-modal">
        <div class="dialog">
          <slot></slot>
        </div>
          <!-- <div class="px-6 pb-6 text-center">
              <h3 class="text-xl mb-2 font-semibold">Your Options</h3>
              <p class="text-gray-600 font-light">What action would you like to perform?</p>
          </div>
          <ul class="cursor-pointer border-t border-gray-100 text-center">
              <li class="border-b text-blue-500 border-gray-100 w-full px-6 py-3 hover:bg-gray-100">Option 1</li>
              <li class="border-b text-blue-500 border-gray-100 w-full px-6 py-3 hover:bg-gray-100">Option 2</li>
              <li class="w-full text-red-500 px-6 py-3 rounded-b-lg hover:bg-gray-100">Delete</li>
          </ul> -->

      </div>
  </div>
</template>

<script>

export default {
  name: "CustomModal",
  methods: {
      hide() {
          console.log('click registered');
          this.$emit('close')
      }
  }
}
</script>

<style scoped>
.main {
  top:0;
  left:0;
  z-index: 20;
  background-color: rgb(92 95 110);
  opacity: 0.6;
}
.container {
  border-radius: 0.5rem;
  padding-top: 1.5rem;
  width: 24rem;
  top: 50%;
  left: 50%;
  --transform-translate-x: 50%;
  --transform-translate-y: 50%;
  z-index: 30;
}
.container-modal {
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    pointer-events: none;
}
.dialog {
    position: relative;
    display: grid;
    max-height: 100%;
    border-radius: 0.75rem;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    padding-top: 2.25rem;
    padding-bottom: 2.25rem;
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    grid-template-rows: auto 1fr auto;
    pointer-events: all;
    width: 100%;
    max-width: 30rem;
    width: 100%;
    max-width: 30rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
/* .bounce-enter-active {
  animation: bounce-in .1s ease-out both;
} */

.bounce-leave-active {
  animation: bounce-in .5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
      transform: scale(0);
  }
  50% {
      transform: scale(1.10);
  }
  100% {
      transform: scale(1);
  }
}
</style>