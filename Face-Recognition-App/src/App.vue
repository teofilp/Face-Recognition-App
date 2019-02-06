<template>
  <div class="wrapper">
    <div id="bg" :class="{inactive: formActive}">
      <div class="overlay"></div>
    </div>
    <div class="container">
      <div class="row">
        <transition name="slideX" mode="out-in" appear>
          <button
            id="activateButton"
            class="btn btn-info col-md-4 offset-md-4 p-3 mt-5"
            @click="startDetectionForm"
            v-if="!formActive"
          >Try Face Detection</button>
          <detection @closeForm="formActive = false" v-if="formActive"></detection>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Detection from "./components/Detection.vue";
export default {
  data() {
    return {
      formActive: false
    };
  },
  methods: {
    startDetectionForm() {
      this.formActive = true;
    }
  },
  components: {
    detection: Detection
  }
};
</script>

<style scoped>
body {
  overflow: hidden;
}

#bg {
  width: 100%;
  height: 100vh;
  position: absolute;
  filter: blur(1px);
  background: url("./assets/bg.png");
  z-index: 0;
}

.overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(51, 199, 224, 0.3));
  z-index: 1;
}

button {
  z-index: 9999;
}

#bg.inactive {
  filter: blur(3px);
  transition: filter 0.3s;
}

.slideX-enter-active {
  animation: slide-x-in 0.3s ease-in-out forwards;
}

.slideX-leave-active {
  animation: slide-x-out 0.3s ease-in-out forwards;
}

@keyframes slide-x-in {
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-x-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-30px);
    opacity: 0;
  }
}
/*
:style="{'background-image': 'url(' + require('./assets/bg.png') + ')'}"
*/
</style>
