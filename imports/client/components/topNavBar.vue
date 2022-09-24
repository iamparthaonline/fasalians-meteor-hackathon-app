<template>
  <div class="top-nav-bar d-flex flex-no-wrap justify-space-between">
    <span>
      <v-icon v-if="isBackButton" class="mr-2" medium @click="$router.go(-1)">mdi-keyboard-backspace</v-icon>
      {{ title }}
    </span>
    <div v-if="icon" :class="`nav-btn-conatiner ${isIconActive ? 'active' : ''}`" @click="$emit('handle-click')">
      <v-icon medium>{{ icon }}</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      icon: String,
      isIconActive: Boolean,
      isBackButton: Boolean,
    },
  };
</script>

<style lang="scss">
  .top-nav-bar {
    width: 100vw;
    padding: 20px;
    span {
      font-weight: bold;
      font-size: 18px;
    }
    .nav-btn-conatiner {
      padding: 3px 7px;
      border-radius: 5px;
      &.active {
        position: relative;
        &::before {
          position: absolute;
          top: 4px;
          right: 3px;
          content: '';
          height: 5px;
          width: 5px;
          border-radius: 50%;
          background: green;
        }
      }
    }
  }
</style>
