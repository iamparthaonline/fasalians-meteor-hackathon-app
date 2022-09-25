<template>
  <div>
    <div v-if="loadingData" class="card skeleton"></div>
    <div v-else :class="{selected: isSelected}" class="card" @click="$emit('clicked')">
      <div class="content-div">
        <img class="image" :src="cardData.contentImage" alt="" />
        <div class="para-btn">
          <p class="para-title">{{ cardData.contentTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cardData: {
        type: Object,
      },
      isSelected: {
        type: Boolean,
        default: false,
      },
      loadingData: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>
  .card {
    margin-top: 20px;
    width: 100%;
    min-height: 100px;
    color: black;
    border-radius: 10px;
  }
  .selected {
    border: 3px solid green;
    border-radius: 10px;
  }
  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
  }
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(220, 0%, 40%);
    }
    100% {
      background-color: hsl(220, 0%, 24%);
    }
  }
  .para-title {
    padding-right: 10px;
    padding-left: 10px;
    display: block;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
    max-height: 45px;
    visibility: visible;
    /* autoprefixer: off */
  }
  .content-div {
    position: relative;
    padding: 10px;
    gap: 15px;
    display: flex;
    align-items: center;
  }
  .image {
    border-radius: 10px;
    height: 100px;
    width: 100px;
  }
  .topics {
    background-color: #f6f6f6;
    font-size: 12px;
    margin-bottom: 0;
  }
  .title {
    background-color: antiquewhite;
    font-size: 12px;
    width: fit-content;
  }
  .read-btn {
    background-color: #112d4e;
    color: white;
    border-radius: 5px;
    margin: 10px;
  }
</style>