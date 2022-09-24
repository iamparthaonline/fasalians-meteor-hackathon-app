<template>
  <div class="onboarding-page">
    <div v-if="step === 1">
      <img height="200px" width="200px" src="/topic.svg" />
      <p class="my-5">Select the topics that you are interested in,</p>
      <div class="text-left">
        <v-chip
          v-for="topic in primaryTopicsList"
          :key="topic"
          class="ma-1"
          :color="topics.indexOf(topic) > -1 ? 'green' : 'secondary'"
          outlined
          small
          @click="toggleSelectTopic(topic)"
        >
          {{ topic }}
        </v-chip>
      </div>
    </div>

    <div v-if="step === 2">
      <img height="200px" width="200px" src="/location.svg" />
      <p class="my-5">Select your state</p>
      <div class="state-list">
        <div
          v-for="(location, index) in location"
          :key="index"
          :class="{selected: location.name === state}"
          class="state-item"
          @click="state = location.name"
        >
          <img :src="location.imgSrc" alt="" />
          <div>
            {{ location.name }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="step === 3">
      <img height="200px" width="200px" src="/who.svg" />
      <p class="my-5">Select what best describes you</p>
      <div class="text-center">
        <div v-for="(roleData, index) in roles" :key="index">
          <v-chip
            class="ma-1"
            :color="roleData.name === role ? 'green' : 'secondary'"
            outlined
            @click="role = roleData.name"
          >
            {{ roleData.name }}
          </v-chip>
        </div>
      </div>
    </div>

    <div :class="`bottom-btn ${step > 1 ? 'd-flex justify-space-between' : 'text-right'}`">
      <v-btn v-show="step > 1" class="ma-2" elevation="1" color="white" @click="back">
        <v-icon left>mdi-arrow-left</v-icon>
        Back
      </v-btn>
      <v-btn
        class="ma-2"
        outlined
        color="primary"
        :disabled="!isButtonActive || loading"
        :loading="loading"
        @click="moveNext"
      >
        Next
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import states from '../../util/regions';

  export default {
    data() {
      return {
        state: undefined,
        role: undefined,
        primaryTopicsList: [],
        topics: [],
        step: 1,
        loading: false,
        location: states,
        roles: [
          {name: 'Farmer', imgSrc: '/ncr.png'},
          {name: 'Agri Business', imgSrc: '/bang.png'},
          {name: 'Agri Teacher/Student', imgSrc: '/mumbai.png'},
          {name: 'Agri Scientist', imgSrc: '/mumbai.png'},
          {name: 'Agri Enthusiast', imgSrc: '/hyd.png'},
        ],
      };
    },
    computed: {
      isButtonActive() {
        const {state, step, topics, role} = this;
        return (step === 1 && topics.length > 0) || (step === 2 && state) || (step === 3 && role);
      },
    },
    beforeCreate() {
      if (Meteor.user().profile.isOnboarded) {
        this.$router.push({name: 'dashboard'});
      }
      Meteor.call('getPrimaryTopicsForOnboarding', (err, response) => {
        console.log(response);
        this.primaryTopicsList = [...response];
      });
    },
    methods: {
      moveNext() {
        const {state, step, topics, role} = this;

        if (step === 3) {
          this.loading = true;
          Meteor.call('updateUserOnboardingDetails', state, role, topics, () => this.$router.push({name: 'dashboard'}));
        } else {
          this.step += 1;
        }
      },
      back() {
        if (this.step > 1) {
          this.step -= 1;
        }
      },
      toggleSelectTopic(topic) {
        const {topics} = this;
        if (topics.indexOf(topic) > -1) {
          topics.splice(topics.indexOf(topic), 1);
        } else {
          topics.push(topic);
        }
        this.topics = topics;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .onboarding-page {
    padding: 20px;
    padding-bottom: 100px;
    margin: auto;
    text-align: center;
    margin-top: 50px;
    img {
      margin: 20px !important;
      display: inline-block;
    }
    p {
      margin-bottom: 20px !important;
    }
    .bottom-btn {
      position: fixed;
      bottom: 10px;
      left: 0;
      width: 100vw;
    }
    .state-list {
      display: grid;
      grid-template-columns: auto auto auto;
    }
    .state-item {
      background-color: rgb(253, 253, 253);
      min-width: 70px;
      text-align: center;
      border: 2px solid white;
      border-radius: 10px;
      font-size: 12px;
      padding: 10px;
      margin: 3px;
      &.selected {
        border-color: #3ed088;
      }
      img {
        width: 30px;
        height: 30px;
        margin: 0 !important;
      }
    }
  }
</style>
