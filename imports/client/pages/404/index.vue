<template>
  <div>
    <TopNavBar
      title="Err.."
    />
    <div class="error-page">
      <img height="200px" width="200px" src="/road.svg">
      <p>
        It seems something went wrong, please click below to find the right way!
      </p>
        <v-btn class="ma-2" outlined color="secondary" @click="$router.push({name: 'dashboard'})">
          <v-icon left>mdi-arrow-left</v-icon>
          Go to Dashboard
        </v-btn>
    </div>
    <BottomNavBar active-page="dashboard" />
  </div>
</template>

<script>
  import BottomNavBar from '../../components/bottomBar.vue';
  import TopNavBar from '../../components/topNavBar.vue';

  export default {
    components: {
      BottomNavBar,
      TopNavBar,
    },
    meteor: {
      user: () => Meteor.user(),
    },
  };
</script>

<style lang="scss">
  .error-page {
    padding: 20px;
    padding-bottom: 100px;
    margin: auto;
    text-align: center;
    margin-top: 50px;
  }
  img{
    margin: 20px !important;
    display: inline-block;
  }
  p {
    margin: 20px 0 !important;
  }


</style>
