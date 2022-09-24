<template>
  <v-card outlined :loading="loading" class="ma-3">
    <div class="d-flex align-center ml-4" @click.stop="goToPublicProfile(author)">
      <v-avatar small size="32">
        <img :src="author.image" alt="" referrerpolicy="no-referrer" />
      </v-avatar>

      <div>
        <v-card-title class="text-body-2 font-weight-bold">{{ author && author.name }}</v-card-title>
        <v-card-subtitle class="text-caption font-weight-bold blue-grey--text lighten-5--text">
          {{ post && getAlertTime(post.createdAt) }}
        </v-card-subtitle>
      </div>
    </div>

    <v-img :lazy-src="post.imageData.thumbnailUrl" height="300" :src="post.imageData.url"></v-img>
    <div class="d-flex mx-2">
      <v-row align="center">
        <v-btn v-if="liked" class="my-4 ml-4" text icon color="blue lighten-2" @click="likePost(false)">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn v-else class="my-4 ml-4" text icon color="black lighten-2" @click="likePost(true)">
          <v-icon>mdi-thumb-up-outline</v-icon>
        </v-btn>
        <v-btn class="my-4 ml-2" text icon color="black lighten-2" @click="$router.push({path: `/post/${post._id}`})">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-btn class="my-4 ml-2" text icon color="black lighten-2">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-row>
      <v-btn class="my-2 ml-2" text icon color="black lighten-2">
        <v-icon>mdi-bookmark-outline</v-icon>
      </v-btn>
    </div>
    <!-- style="overflow: hidden; text-overflow: ellipsis; min-height: 100px; white-space: nowrap; width: 90%" -->
    <v-divider></v-divider>
    <v-card-text class="font-weight-bold pa-0 ml-3 my-1">
      {{ noOfLikes === 1 ? noOfLikes + ' Like' : noOfLikes + ' Likes' }}

      {{ noOfComments === 1 ? noOfComments + ' Comment' : noOfComments + ' Comments' }}
    </v-card-text>
    <p class="pa-0 pb-3 mx-3 text-start" @click="$router.push({path: `/post/${post._id}`})">
      <span class="font-weight-black black--text">{{ author && author.name }}&nbsp;</span>
      <span v-if="post && post.description.length > 150" class="font-weight-regular text-justify">
        {{ post && post.description.slice(0, 150) }}
        <span class="font-weight-bold">...more</span>
      </span>
      <span v-else class="font-weight-regular text-justify">
        {{ post && post.description }}
      </span>
    </p>
  </v-card>
</template>
<script>
  export default {
    name: 'ForumCard',
    props: {
      author: {
        type: Object,
        default: () => {},
      },
      post: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        loading: false,
        liked: false,
        noOfLikes: this.post.likes.length,
        noOfComments: this.post.CommentCount,
      };
    },
    mounted() {
      this.checkCurrentUserLikedPost();
    },
    methods: {
      likePost(isLiked) {
        this.liked = isLiked;
        // Need to Create a Meteor Method for Like Post
      },
      checkCurrentUserLikedPost() {
        if (this.post.likes.indexOf(Meteor.user()._id) > -1) {
          this.liked = true;
        } else {
          this.liked = false;
        }
      },
      goToPublicProfile(author) {
        this.$router.push({name: 'public-profile', params: {userId: author._id}});
      },
    },
  };
</script>

<style lang="scss" scoped></style>
