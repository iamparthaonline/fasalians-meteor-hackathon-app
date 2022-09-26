<template>
  <div class="contents-page-container">
    <TopNavBar
      title="Explore"
      icon="mdi-bookmark-multiple-outline"
      :is-icon-active="true"
      @handle-click="$router.push({name: 'saved'})"
    />
    <v-tabs grow class="mb-4">
      <v-tab @click="activeView = 'latest'">Latest</v-tab>
    </v-tabs>

    <div v-if="activeView === 'latest'">
      <div class="mx-3">
        <v-text-field v-model="search" placeholder="Search.." label="Search">
          <v-icon slot="append">mdi-magnify</v-icon>
        </v-text-field>
      </div>

      <ExplorePage :query="search" />
    </div>

    <BottomNavBar active-page="explore" />
  </div>
</template>

<script>
  import TopNavBar from '../../components/topNavBar.vue';
  import ExplorePage from './explore.vue';
  import BottomNavBar from '../../components/bottomBar.vue';

  export default {
    components: {
      ExplorePage,
      TopNavBar,
      BottomNavBar,
    },
    data() {
      return {
        search: '',
        activeView: 'latest',
      };
    },
  };
</script>

<style lang="scss" scoped>
  .contents-page-container {
    width: 100vw;
    .v-input .v-input__control {
      .v-text-field__details {
        display: none !important;
      }
      .v-input__slot {
        margin: 0 !important;
      }
    }
  }
  .v-application--is-ltr .v-messages {
    margin: 0 !important;
  }
</style>
