<template>
  <div class="bottom-bar-container">
    <v-bottom-navigation v-model="value" :background-color="color" light shift>
      <v-btn value="dashboard" @click="$router.push({name: 'dashboard'})">
        <span>Home</span>

        <v-icon>mdi-home-variant-outline</v-icon>
      </v-btn>

      <v-btn value="explore" @click="$router.push({name: 'explore'})">
        <span>Explore</span>

        <v-icon>mdi-lightbulb-on-outline</v-icon>
      </v-btn>

      <v-btn value="forum" @click="$router.push({name: 'forum'})">
        <span>Forum</span>

        <v-icon>mdi-account-group-outline</v-icon>
      </v-btn>

      <!-- <v-btn value="ask-expert" @click="$router.push({name: 'ask-expert'})">
        <span>Ask</span>

        <v-icon>mdi-head-question-outline</v-icon>
      </v-btn> -->

      <v-btn value="report" @click="$router.push({name: 'report'})">
        <span>Health</span>
        <v-icon>mdi-bottle-tonic-plus-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
  export default {
    props: {
      activePage: String,
    },
    data: () => {
      return {value: undefined};
    },
    computed: {
      color() {
        switch (this.value) {
          // case 'dashboard': return '#00613C'
          // case 'club': return 'teal'
          // case 'ask-expert': return 'brown'
          // case 'health': return 'indigo'
          default:
            return 'white';
        }
      },
      currentRouteName() {
        return this.$route.name;
      },
    },
    mounted() {
      this.value = this.activePage || 'dashboard';
    },
  };
</script>

<style lang="scss">
  .bottom-bar-container {
    width: 100vw;
    position: fixed;
    bottom: 0;
    box-shadow: 0px 1px 3px 0px rgba(223, 227, 230, 0.3), 0px 4px 8px 3px rgba(100, 104, 106, 0.15);
    left: 0;
  }
</style>
