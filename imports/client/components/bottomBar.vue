<template>
  <div class="bottom-bar-container">
    <v-bottom-navigation v-model="value" :background-color="color" light shift>
      <v-btn
        v-for="{label, icon, route} in menuOptions"
        :key="label"
        :value="label"
        @click="$router.push({name: route})"
      >
        <span>{{ label }}</span>

        <v-icon>{{ icon }}</v-icon>
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
      return {
        value: undefined,
        menuOptions: [
          {label: 'Home', icon: 'mdi-home-variant-outline', route: 'dashboard'},
          {label: 'Explore', icon: 'mdi-lightbulb-on-outline', route: 'explore'},
          {label: 'Forum', icon: 'mdi-account-group-outline', route: 'forum'},
          {label: 'Health', icon: 'mdi-bottle-tonic-plus-outline', route: 'report'},
        ],
      };
    },
    computed: {
      color() {
        switch (this.value) {
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
