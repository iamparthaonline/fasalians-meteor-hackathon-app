<template>
  <div class="todays-update d-flex flex-no-wrap justify-space-between" @click="goToDigestContent">
    <div>
      <h2>Latest Digest</h2>
      <p>Read the trending updates from the Agri-world</p>
    </div>
    <img src="/update.png" />
  </div>
</template>

<script>
  export default {
    methods: {
      goToDigestContent() {
        Meteor.call('trackPoints', 'READ_DIGEST');
        this.$router.push({name: 'digestContent'});
      },
    },
  };
</script>

<style></style>
