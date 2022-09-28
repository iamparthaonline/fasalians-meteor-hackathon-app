<template>
  <div>
    <TopNavBar
      :title="`${getCurrentGreetingsMessage()}, ${user.profile.name}`"
      icon="mdi-account-circle-outline"
      @handle-click="$router.push({name: 'profile'})"
    />
    <div class="dashboard-page">
      <Digest />
      <div class="my-2 text-center">
        <v-btn
          v-if="(user.profile.isAdmin && !todaysDigest)"
          outlined
          color="primary"
          @click="goToDigestCreation"
        >
          Add today's digest
        </v-btn>
      </div>

      <div class="my-2 text-center">
        <v-btn v-if="user.profile.isAdmin" outlined color="primary" @click="goToModeration">Moderate Contents</v-btn>
      </div>

      <Weather />
      <Challanges />
    </div>
    <BottomNavBar active-page="dashboard" />
  </div>
</template>

<script>
  import Digest from './digest.vue';
  import Weather from './weather.vue';
  import Challanges from './challenges.vue';
  import BottomNavBar from '../../components/bottomBar.vue';
  import TopNavBar from '../../components/topNavBar.vue';

  export default {
    components: {
      Digest,
      Weather,
      BottomNavBar,
      TopNavBar,
      Challanges,
    },
    meteor: {
      user: () => Meteor.user(),
    },
    data() {
      return {
        todaysDigest: undefined,
      };
    },
    mounted() {
      const self = this;
      const todaysDate = DateTime.fromJSDate(new Date()).setLocale('en-IN').toFormat('dd LLLL yyyy');
      Meteor.call('getTodaysDigest', todaysDate, function (err, response) {
        if (!err) {
          self.todaysDigest = response;
        }
      });
    },
    methods: {
      article() {
        this.$router.push({name: 'article'});
      },
      goToDigestCreation() {
        this.$router.push({name: 'digest-form'});
      },
      goToModeration() {
        this.$router.push({name: 'contentModeration'});
      },
    },
  };
</script>

<style lang="scss">
  .dashboard-page {
    padding: 10px;
    padding-bottom: 100px;
  }
  .heading {
    color: white;
  }
  .todays-update {
    background: #fff;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
    img {
      height: 100px;
    }
    h2 {
      font-size: 24px;
      margin: 10px 0;
    }
    p {
      margin: 0;
      font-size: 14px;
    }
  }
  .task-heading {
    margin: 20px 0 10px;
  }
  h4 {
    margin: 0;
  }
  ul {
    list-style: none;
    padding: 0 !important;
  }
</style>
