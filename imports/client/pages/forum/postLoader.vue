<template>
  <v-card class="post-loader mx-3 mt-2 py-3">
    <div>
      <v-skeleton-loader class="mx-2 mt-2" type="list-item-avatar-two-line"></v-skeleton-loader>
    </div>
    <div class="mx-2">
      <v-skeleton-loader class="mx-2 mt-2" type="image"></v-skeleton-loader>
    </div>
    <div class="action-buttons d-flex justify-space-between">
      <div class="one d-flex ml-1">
        <v-skeleton-loader width="40px" height="40px" type="actions"></v-skeleton-loader>
        <v-skeleton-loader width="40px" height="40px" type="actions"></v-skeleton-loader>
        <v-skeleton-loader width="40px" height="40px" type="actions"></v-skeleton-loader>
      </div>
      <v-skeleton-loader class="mr-6" width="40px" height="40px" type="actions"></v-skeleton-loader>
    </div>
    <div class="mx-2">
      <v-skeleton-loader class="ml-3 mt-4" width="40px" type="text"></v-skeleton-loader>
      <v-skeleton-loader class="ml-3 mt-2" type="sentences"></v-skeleton-loader>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'PostLoader',
  };
</script>

<style></style>
