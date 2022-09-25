<template>
  <div class="myForm">
    <TopNavBar
      :title="user.profile.name"
      icon="mdi-logout"
      :is-back-button="true"
      @handle-click="logout"
    />
    <div>
      <h1 class="heading">Profile</h1>
    </div>
    <div class="img-div">
      <img class="profile-img" :src="user.services.google.picture" alt="" />
    </div>
    <div class="details-div">
          <v-text-field v-model="username" :disabled="!editMode" label="Name"></v-text-field>
          <v-text-field v-model="useraddress" :disabled="!editMode" label="Address"></v-text-field>
          <v-radio-group v-model="userGender" :disabled="!editMode">
            <v-radio
              v-for="{label, value}, n in [{label: 'male', 'value': 'Male'}, {label: 'female', 'value': 'Female'}]"
              :key="n"
              :label="label"
              :value="value"
            ></v-radio>
          </v-radio-group>
        <v-select
          :items="states.map( ({name})=> name)"
          label="State"
          v-model="userState"
          :disabled="!editMode"
        ></v-select>
      <div class="text-center">
        <v-btn v-if="!editMode" class="ma-2" outlined color="secondary" @click="onClickEdit">
          <v-icon left>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn v-else class="ma-2" outlined color="primary" @click="updateUserDetails">Save</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import statesList from '../../util/states';
  import TopNavBar from '../../components/topNavBar.vue';

  export default {
    data() {
      return {
        username: '',
        useraddress: '',
        userGender: '',
        editMode: false,
        userState: '',
        states: statesList
      };
    },
    components:{ TopNavBar},
    meteor: {
      user() {
        return Meteor.user();
      },
    },
    mounted() {
      this.userGender = this.user.profile.gender;
      this.useraddress = this.user.profile.address;
      this.username = this.user.profile.name;
      this.userState = this.user.profile.state;
    },
    methods: {
      updateUserDetails(e) {
        e.preventDefault();
        Meteor.call(
          'updateUserDetails',
          Meteor.user()._id,
          this.username,
          this.useraddress,
          this.userGender,
          this.userState,
          (err, response) => {
            console.log(response, err);
          },
        );
        this.editMode = false;
      },
      onClickEdit() {
        this.editMode = true;
      },
      logout() {
        Meteor.logout(() => {
          this.$router.push({name: 'login'});
        });
      },
      backHandle() {
        this.$router.push('./profile');
      },
    },
  };
</script>

<style scoped>
  .myForm {
    position: relative;
    height: 100vh;
    background-color: #fff;
  }

  .img-div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .details-div {
    position: absolute;
    bottom: 0;
    padding: 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    height: calc(100vh - 230px);
    width: 100%;
    margin: 0 auto;
    /* background-color: #393e46; */
  }
  .user-data {
    margin-bottom: 5px;
    font-size: 14px;
    color: #eeeeee;
  }
  .user-details {
    margin-bottom: 5px;
  }
  .line {
    margin: 5px;
    margin-bottom: 20px;
  }
  .input-field {
    border: 0;
    width: 100%;
  }
  .input-field:focus {
    outline: none;
    border-bottom: 3px solid #5fa8d3;
  }

</style>
