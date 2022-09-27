<template>
  <v-card class="mt-1">
    <ProfileTab
      size="small"
      class="pt-2 pl-2"
      :image-url="commenterImage"
      :name="commentedBy"
      :posted-date="commentedOn"
    />
    <v-card-text class="text-body1 font-weight-regular pt-1 pl-3">
      {{ comment }}
    </v-card-text>
  </v-card>
</template>

<script>
  import ProfileTab from './profileTab.vue';

  export default {
    name: 'CommentCard',
    components: {
      ProfileTab,
    },
    props: {
      commentedBy: {
        type: String,
      },
      commentedOn: {
        type: String,
      },
      comment: {
        type: String,
      },
      commenterImage: {
        type: String,
      },
    },
  };
</script>

<style></style>
