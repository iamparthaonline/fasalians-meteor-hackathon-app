<template>
  <div class="app">
    <div>
      <div class="img-container">
        <v-img contain height="150" width="250" lazy-src="lazy-pic.jpeg" responsive src="/front.jpg"></v-img>
      </div>
      <h2 class="heading">
        Love Agriculture ?
        <br />
        <span>Grow with AgriSquad</span>
      </h2>
      <ul>
        <li>🙌 Latest updates in agriculture</li>
        <li>🤝🏼 Connect with agriculturists</li>
        <li>💪 Showcase your skills</li>
        <li>✌️ Get help from the experts</li>
      </ul>
      <div>
        <v-btn
          :loading="loading || !configurationExists"
          :disabled="loading || !configurationExists"
          color="#3ed088"
          class="my-2 white--text"
          @click="login"
        >
          Continue with Google
          <v-icon right dark>mdi-google</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    meteor: {
      configurationExists() {
        return ServiceConfiguration.configurations.findOne({service: 'google'});
      },
    },
    components: {},
    props: {
      loginData: {
        type: Object,
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
            if (Meteor.user().profile.isOnboarded) this.$router.push({name: 'dashboard'});
            else this.$router.push({name: 'onboarding'});
          } else alert(err.toString() || 'Unknown Error');
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .app {
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    text-align: left;
    padding: 20px;
  }
  .heading {
    color: #444;
    margin: 30px 0;
    span {
      color: #3ed088;
    }
  }
  ul {
    margin: 20px 0;
    list-style: none;
    padding: 0;
  }
  .paragraph {
    color: #444;
  }
  .img-container {
    display: inline-block;
  }
</style>
