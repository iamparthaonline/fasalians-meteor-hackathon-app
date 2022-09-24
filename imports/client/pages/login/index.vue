<template>
  <v-btn class="ma-10" depressed color="primary" @click="login()" :loading="loading || !configurationExists">
    Login With Google
  </v-btn>
</template>

<script>
  export default {
    meteor: {
      configurationExists() {
        return ServiceConfiguration.configurations.findOne({service: 'google'});
      },
    },
    data() {
      return {
        loading: false,
      };
    },
    methods: {
      login() {
        this.loading = true;
        Meteor.loginWithGoogle(err => {
          if (!err) {
            this.$router.push({name: 'dashboard'});
          } else alert(err.toString() || 'Unknown Error');
        });
      },
    },
  };
</script>

<style></style>
