<template>
  <div class="card" @click="onClick">
    <img class="image" :src="cardData.contentImage" alt="" />
    <p class="content">{{ cardData.contentTitle }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      cardData: {
        type: Object,
      },
    },
    methods: {
      onClick() {
        window.location.href = this.cardData.contentUrl;
      },
    },
  };
</script>

<style scoped>
  .card {
    height: 280px;
    cursor: pointer;
    padding: 0 10px;
    background-color: white;
    border-radius: 10px;
    border: none;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 16%), 0 1px 6px 0 rgb(0 0 0 / 12%);
  }
  .image {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 200px;
    width: 100%;
  }
  .content {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    /* autoprefixer: off */
  }
</style>
