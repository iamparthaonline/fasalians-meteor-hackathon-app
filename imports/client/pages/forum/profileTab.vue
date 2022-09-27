<template>
  <div class="d-flex">
    <v-avatar :size="size === 'small' ? 42 : 55">
      <img :src="imageUrl" referrerpolicy="no-referrer" alt="John" />
    </v-avatar>
    <div class="name ml-5">
      <p v-if="size !== 'small'" class="font-weight-medium text-h6 ma-0">{{ name }}</p>
      <p v-else class="font-weight-medium ma-0">{{ name }}</p>
      <p v-if="size !== 'small'" class="font-weight-light text-body1 ma-0">{{ postedDate }}</p>
      <p v-else class="font-weight-light text-caption ma-0">{{ postedDate }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileTab',
    props: {
      imageUrl: {
        type: String,
      },
      name: {
        type: String,
      },
      postedDate: {
        type: String,
      },
      size: {
        type: String,
      },
    },
  };
</script>

<style></style>
