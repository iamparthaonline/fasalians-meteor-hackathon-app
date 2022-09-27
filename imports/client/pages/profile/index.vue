<template>
  <div class="main-div">
    <TopNavBar
      :title="user.profile.name"
      icon="mdi-account-edit-outline"
      :is-back-button="true"
      @handle-click="$router.push({name: 'editProfile'})"
    />
    <div class="profile-details">
      <div class="profile-pic-div">
        <!-- <img class="profile-pic" :src="user.services.google.picture" alt="" /> -->
        <v-img
          class="profile-pic"
          contain
          height="100"
          width="100"
          lazy-src="lazy-pic.jpeg"
          responsive
          :src="user.services.google.picture"
        ></v-img>
      </div>
      <div class="details">
        <div>
          <h3>+500</h3>
          <p class="headings">Followers</p>
        </div>
        <div class="line"></div>
        <div>
          <h3>9198</h3>
          <p class="headings">Posts</p>
        </div>
        <div class="line"></div>
        <div>
          <h3>1435</h3>
          <p class="headings">Reads</p>
        </div>
      </div>
      <div class="text-center ma-5">
        <span>
          <v-icon small left class="ma-0">mdi-map-marker-outline</v-icon>
          {{ user.profile.state }}
        </span>
        <br />
        <span>
          {{ user.profile.role }}
        </span>
      </div>
      <div v-if="false" class="buttons">
        <button class="connect-btn">+ Connect</button>
      </div>
      <div v-else class="level-container" @click="$router.push({name: 'gamify'})">
        <div class="level-text">
          <span>Level {{ user.profile.level || 0 }}</span>
          <v-chip x-small chip class="ma-2" color="green" outlined>Details</v-chip>
        </div>
        <div>
          <span class="coins">
            <v-icon small>mdi-lightning-bolt-circle</v-icon>
            {{ user.profile.points || 0 }} points
          </span>
          |
          <span class="coins">{{ user.profile.coins || 0 }} Agri Coins</span>
        </div>
      </div>
      <div class="interests">
        <h4>Interests</h4>
        <div class="chips-div">
          <v-chip
            v-for="(topic, index) in user.profile.topics"
            :key="index"
            outlined
            class="ma-1"
            color="rgb(92, 187, 246)"
            small
          >
            {{ topic }}
          </v-chip>
        </div>
        <h3>Time on Social</h3>
        <div class="my-3">
          <trend
            :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
            :gradient-direction="left"
            :gradient="['#b8f2e6', '#6fa8dc', '#42b983']"
            :padding="8"
            :radius="8"
            :stroke-width="1"
            :stroke-linecap="square"
            auto-draw
            smooth
          ></trend>
        </div>
      </div>
      <div class="text-center">
        <v-btn class="ma-2" outlined color="secondary" @click="$router.push({name: 'editProfile'})">
          <v-icon left>mdi-pencil</v-icon>
          Edit Profile
        </v-btn>
        <v-btn class="ma-2" outlined color="secondary" @click="logout">Logout from app</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Trend from 'vuetrend';
  import TopNavBar from '../../components/topNavBar.vue';

  Vue.use(Trend);
  export default {
    components: {
      TopNavBar,
    },
    data() {
      return {};
    },
    meteor: {
      user: () => Meteor.user(),
    },
    methods: {
      logout() {
        Meteor.logout(() => {
          this.$router.push({name: 'login'});
        });
      }
    },
  };
</script>

<style scoped>
  .main-div {
    background-color: white;
    min-height: 100vh;
  }
  .profile-details {
    padding: 20px;
  }
  .level-container {
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px;
    margin: 15px 0;
  }
  .level-text {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
  }
  .profile-pic-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-pic {
    height: auto;
  }
  .details {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headings {
    color: gray;
  }
  .connect-btn {
    height: 50px;
    width: 250px;
    border: none;
    outline: none;
    border-radius: 45px;
    color: white;
    background-color: #222831;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  }
  .buttons {
    display: flex;
    justify-content: space-evenly;
  }

  .icons {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  .para {
    margin-bottom: 0;
    font-size: 16px;
  }
  .header {
    display: flex;
    padding: 10px;
    margin: 10px;
    align-items: center;
  }
  .name {
    margin-bottom: 0;
  }
  .back-img {
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin-right: 10px;
  }
  .line {
    height: 30px;
    width: 1px;
    background-color: #eeeeee;
  }
  h3 {
    margin: 10px 0 !important;
  }
</style>
