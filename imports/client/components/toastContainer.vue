<template>
  <Transition name="slide-fade">
    <div v-if="showToast" class="toast-message-container">
      <span>{{ notificationData }}</span>
      <button class="undo-btn" @click="$emit('undo-handler')">Undo</button>
    </div>
  </Transition>
</template>

<script>
  export default {
    props: {
      notificationData: {
        type: String,
        default: '',
      },
      showToast: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style>
  .toast-message-container {
    background-color: #393e46;
    color: white;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: auto;
    padding: 12px;
    box-shadow: 1px -2px 0px 0px #7974740f;
  }
  .undo-btn {
    background-color: #2b4865;
    border-radius: 5px;
    color: #e3fdfd;
    border: none;
    outline: none;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
