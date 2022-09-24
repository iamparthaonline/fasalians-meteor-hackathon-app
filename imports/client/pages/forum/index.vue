<template>
  <v-app style="position: relative">
    <div class="top-bar">
      <TopNavBar :title="userName ? `${userName}'s posts` : 'Forum'" :is-back-button="userName" />
    </div>
    <div class="postContainer mb-12">
      <ForumCard v-for="post in postList" :key="post._id" :author="post.user" :post="post" />
    </div>
    <div class="text-center" v-if="!userName && !loading">
      <v-bottom-sheet v-model="sheet" persistent fullscreen>
        <template #activator="{on, attrs}">
          <v-btn
            class="mx-2"
            fab
            dark
            color="#00613C"
            small
            v-bind="attrs"
            style="position: fixed; bottom: 80px; right: 15px"
            v-on="on"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-sheet class="text-center" height="100%">
          <div class="d-flex justify-end">
            <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
              <v-icon dark large color="black">mdi-close</v-icon>
            </v-btn>
          </div>
          <!-- content -->
          <CreatePost class="mt-12" @submitPost="handleSubmitPost" />
        </v-sheet>
      </v-bottom-sheet>
    </div>
    <BottomNavBar active-page="forum" />
  </v-app>
</template>

<script>
  import CreatePost from './createPost.vue';
  import ForumCard from './forumCard.vue';
  import BottomNavBar from '../../components/bottomBar.vue';
  import TopNavBar from '../../components/topNavBar.vue';

  export default {
    name: 'FarmerForum',
    components: {
      ForumCard,
      CreatePost,
      BottomNavBar,
      TopNavBar,
    },
    data() {
      return {
        showCreatePost: false,
        postList: [],
        sheet: false,
        loading: false,
        userIdFor: undefined,
        userName: undefined,
      };
    },
    mounted() {
      this.userIdFor = this.$route.params.userId;
      this.getAllPosts();
    },
    methods: {
      createPost() {},
      handleSubmitPost() {
        this.sheet = false;
        this.getAllPosts();
      },
      getAllPosts() {
        // Need to Create Meteor Method for Getting All the Posts
      },
    },
  };
</script>

<style lang="scss" scoped></style>
