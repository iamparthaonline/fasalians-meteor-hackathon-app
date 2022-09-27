<template>
  <div class="full-screen">
    <TopNavBar :is-back-button="true" @handle-click="$router.go(-1)" />
    <template v-if="loading">
      <div class="d-flex flex-column justify-start align-center">
        <v-skeleton-loader class="avatar" height="100px" type="card"></v-skeleton-loader>
        <v-skeleton-loader class="line-1 mt-4" type="text"></v-skeleton-loader>
        <v-skeleton-loader class="line-2" type="text"></v-skeleton-loader>
        <v-skeleton-loader class="ma-4" type="button"></v-skeleton-loader>
      </div>
    </template>
    <template v-else>
      <div class="profile ma-4">
        <div class="profile-image">
          <v-img
            class="profile-pic rounded-circle"
            contain
            height="100"
            width="100"
            lazy-src="lazy-pic.jpeg"
            responsive
            :src="profileUser.services.google.picture"
          ></v-img>
          <div class="profile-name text-h5 mt-4">
            {{ (profileUser.profile && profileUser.profile.name) || profileUser.services.google.name }}
          </div>
          <div class="text-caption mb-2">
            {{ profileUser.services.google.email }}
          </div>
          <div class="text-caption mb-2">
            {{ profileUser.profile.gender === 'female' ? '👩🏻 She / Her / Hers' : '👨🏻‍🌾 He / him / his' }} |
            {{ profileUser.profile.role }} | {{ profileUser.profile.state }}
          </div>

          <div class="text-caption mb-2">
            Level {{ profileUser.profile.level || 0 }} | {{ profileUser.profile.points }} points |
            {{ profileUser.profile.reads || 0 }} Reads
          </div>

          <div class="text-caption mb-2">
            {{ profileUser.forumPostCount || 0 }} Posts
            <v-btn
              class="ml-1"
              elevation="1"
              x-small
              v-if="profileUser.forumPostCount > 0"
              @click="$router.push({name: 'user-forum', params: {userId: $route.params.userId}})"
            >
              View Posts
            </v-btn>
          </div>
          <div class="my-3 text-center">
            <v-chip
              v-for="(topic, index) in profileUser.profile.topics"
              :key="index"
              outlined
              class="ma-1"
              color="rgb(92, 187, 246)"
              small
            >
              {{ topic }}
            </v-chip>
          </div>
          <v-btn
            v-if="user._id !== profileUser._id"
            class="ma-4"
            outlined
            large
            rounded
            :color="!isFollowing ? 'indigo' : 'green'"
            :loading="followButtonLoading"
            @click="togglefollowingOfProfileUser"
          >
            <span v-if="isFollowing">Following</span>
            <span v-else>Follow</span>
          </v-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    meteor: {
      user: () => Meteor.user(),
    },
    data() {
      return {
        loading: true,
        profileUser: '',
        followButtonLoading: false,
      };
    },
    computed: {
      isFollowing() {
        return this.profileUser?.profile?.followers?.includes(this.user._id);
      },
    },
    async created() {
      try {
        this.profileUser = await this.getProfileUser();
      } catch (err) {
        alert(err);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      getProfileUser() {
        return new Promise((resolve, reject) => {
          Meteor.call('getUserProfile', this.$route.params.userId, (err, res) => {
            if (err) reject(err);
            else resolve({profile: {}, ...res});
            console.log('res', res);
          });
        });
      },
      togglefollowingOfProfileUser() {
        if (!this.followButtonLoading) {
          this.followButtonLoading = true;
          if (this.isFollowing) {
            Meteor.call('unfollowUser', this.profileUser._id, err => {
              this.followButtonLoading = false;
              if (err) alert(err);
              else {
                this.profileUser.profile.followers.pop(this.user._id);
              }
            });
          } else {
            Meteor.call('followUser', this.profileUser._id, err => {
              this.followButtonLoading = false;
              if (err) alert(err);
              else {
                if (!this.profileUser.profile.followers) {
                  this.$set(this.profileUser.profile, 'followers', []);
                }
                this.profileUser.profile.followers.push(this.user._id);
              }
            });
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .full-screen {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
  }
  .profile {
    .profile-image {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .line-1 {
    width: 50%;
  }
  .line-2 {
    width: 60%;
  }
  .avatar {
    height: 100px;
    width: 100px;
    border-radius: 50px;
  }
</style>
