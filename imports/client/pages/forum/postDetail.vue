<template>
  <v-app>
    <div class="title d-flex align-center text-center my-2 ml-2">
      <v-icon dark color="black" @click="$router.push({path: '/forum'})">mdi-arrow-left</v-icon>
    </div>
    <div class="pa-3" style="position: relative; min-height: 100%">
      <profile-tab
        :image-url="postData && postData.user.image"
        :name="postData && postData.user.name"
        :posted-date="postData && getAlertTime(postData.createdAt)"
      />

      <v-img
        :src="postData && postData.imageData.url"
        :lazy-src="postData && postData.imageData.thumbnailUrl"
        max-width="500"
        max-height="300"
        class="mt-3"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <p class="text-justify mt-3">
        {{ postData && postData.description }}
      </p>
      <v-divider></v-divider>
      <div class="d-flex">
        <v-row align="center">
          <v-btn v-if="liked" class="my-4 ml-4" text icon color="blue lighten-2" @click="likePost(false)">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn v-else class="my-0 ml-4" text icon color="black lighten-2" @click="likePost(true)">
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <v-btn class="my-0 ml-2" text icon color="black lighten-2">
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <v-btn class="my-0 ml-2" text icon color="black lighten-2">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-row>
        <v-btn class="my-0 ml-2" text icon color="black lighten-2">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-start">
        <p class="font-weight-medium text-caption ml-2">
          {{ noOfLikes === 1 ? noOfLikes + ' Like' : noOfLikes + ' Likes' }}
        </p>

        <p class="font-weight-medium text-caption ml-2">
          {{ noOfComments === 1 ? noOfComments + ' Comment' : noOfComments + ' Comments' }}
        </p>
      </div>
      <div class="comments">
        <CommentCard
          v-for="comment in commentList"
          :key="comment._id + comment.comment"
          :comment="comment.comment"
          :commented-by="comment.commenter"
          :commented-on="getAlertTime(comment.commentedAt)"
          :commenter-image="comment.commenterImage"
        />
      </div>
      <div
        v-intersect="{
          handler: onIntersect,
          options: {
            threshold: [0, 0.5, 1.0],
          },
        }"
      >
        <div v-if="loading">
          <v-skeleton-loader class="mx-2 mt-2" type="list-item-avatar-two-line ,divider,paragraph"></v-skeleton-loader>
          <v-skeleton-loader class="mx-2 mt-2" type="list-item-avatar-two-line ,divider,paragraph"></v-skeleton-loader>
        </div>
      </div>
    </div>
    <div class="add-comment">
      <div class="d-flex align-center">
        <v-avatar size="36" class="ml-2">
          <img
            :src="currentUser.services.google.picture"
            referrerpolicy="no-referrer"
            :alt="currentUser.profile.name"
          />
        </v-avatar>

        <v-text-field
          v-model="commentText"
          class="px-4"
          label="Add a comment"
          :loading="commentLoading"
          :disabled="commentLoading"
        ></v-text-field>
        <v-btn
          small
          color="success"
          class="mr-2"
          dark
          :loading="commentLoading"
          :disabled="commentLoading"
          @click="postComment"
        >
          Post
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
  import CommentCard from './commentCard.vue';
  import ProfileTab from './profileTab.vue';

  export default {
    name: 'PostDetail',
    components: {CommentCard, ProfileTab},
    data() {
      return {
        commentText: '',
        commentList: [],
        pageSize: 5,
        pageOffset: 0,
        loading: false,
        commentLoading: false,
        postData: undefined,
        liked: false,
        currentUser: Meteor.user(),
        noOfLikes: 0,
        noOfComments: 0,
      };
    },
    mounted() {
      this.getPostDetail(this.$route.params.id);
      this.getCommentCount();
      this.loadAllComments();
    },
    methods: {
      postComment() {
        this.commentLoading = true;
        this.pageOffset = 0;
        this.commentList = [];
        Meteor.call('postComment', this.$route.params.id, this.commentText, (err, res) => {
          this.loadAllComments();
          this.commentLoading = false;
          this.commentText = '';
        });
      },
      getPostDetail(postId) {
        Meteor.call('getPostDetails', postId, (err, res) => {
          if (res) {
            this.postData = res;
            this.checkCurrentUserLikedPost();
            this.noOfLikes = this.postData.likes.length;
          }
        });
      },
      getCommentCount() {
        Meteor.call('getCommentCount', this.$route.params.id, (err, res) => {
          this.noOfComments = res || 0;
        });
      },
      loadAllComments() {
        this.loading = true;
        const {commentList} = this;
        Meteor.call('getAllComments', this.$route.params.id, this.pageSize, this.pageOffset, (err, res) => {
          if (res) {
            this.commentList = [...commentList, ...res];
            this.pageOffset += 1;
          }
          this.loading = false;
          this.getCommentCount();
        });
      },
      onIntersect() {
        // Pagination
        if (!this.loading) {
          this.loadAllComments();
        }
      },
      checkCurrentUserLikedPost() {
        if (this.postData.likes.indexOf(Meteor.user()._id) > -1) {
          this.liked = true;
        } else {
          this.liked = false;
        }
      },
      likePost(isLiked) {
        this.liked = isLiked;
        Meteor.call('likeForumPost', isLiked, Meteor.user()._id, this.postData._id, (err, res) => {
          if (!err) {
            this.noOfLikes = res.likes.length;
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .add-comment {
    background: white;
    position: sticky;
    bottom: 1px;
  }
</style>
