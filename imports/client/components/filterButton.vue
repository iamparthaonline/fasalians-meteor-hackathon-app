<template>
  <div id="filter-buttons">
    <button :class="{active: isActive}" class="filter-btn" @click="handleClick">{{ label }}</button>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: '',
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleClick() {
        this.$emit('click-handler');
      },
    },
  };
</script>

<style scoped>
  .filter-btn {
    height: auto;
    margin-right: 10px;
    width: fit-content;
    border: 1px solid #eee;
    color: #222831;
    border-radius: 20px;
    padding: 5px 25px;
    font-size: 14px;
  }
  .active {
    background-color: #222831;
    color: #fff;
  }
</style>
