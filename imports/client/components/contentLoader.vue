<template>
  <div class="card">
    <v-card light ripple>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-skeleton-loader class="mt-4 ml-3" type="text" width="250px"></v-skeleton-loader>
          <v-skeleton-loader class="ml-3" type="text" width="250px"></v-skeleton-loader>
          <v-skeleton-loader class="ml-3" type="text" width="250px"></v-skeleton-loader>
        </div>

        <v-avatar class="ma-3" height="60" width="90" tile>
          <v-skeleton-loader type="avatar"></v-skeleton-loader>
        </v-avatar>
      </div>
      <v-card-actions>
        <div class="ml-2 d-flex align-center">
          <v-skeleton-loader width="40px" height="40px" type="actions"></v-skeleton-loader>
          <v-skeleton-loader class="mx-2 mt-4" type="text" width="100px"></v-skeleton-loader>
        </div>
        <div class="ml-2 d-flex align-center">
          <v-skeleton-loader width="40px" height="40px" type="actions"></v-skeleton-loader>
          <v-skeleton-loader class="mx-2 mt-4" type="text" width="50px"></v-skeleton-loader>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'ContentLoader',
  };
</script>

<style scoped>
  .card {
    margin-top: 10px;
    width: 100%;
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
    cursor: pointer;
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
  .para-title:hover {
    text-decoration: underline;
  }
  .content-div {
    position: relative;
    padding: 20px;
    gap: 15px;
    display: flex;
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
  .save-btn {
    top: 0;
    right: 0;
    position: absolute;
    height: 30px;
    width: fit-content;
    border-radius: 3px;
    background-color: #393e46;
    border: 0;
  }
  .save-btn img {
    height: 70%;
    vertical-align: middle;
  }
  .title {
    background-color: antiquewhite;
    font-size: 12px;
    width: fit-content;
  }
  .close {
    background-color: white;
    border-radius: 3px;
    font-size: 12px;
  }
  .para-id {
    background-color: red;
  }
  button {
    border: none;
  }
</style>
