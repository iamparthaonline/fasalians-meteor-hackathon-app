<template>
  <v-card ref="card" class="moderator-form-container">
    <div class="content-title-container text-capitalize">
      <v-img height="200" :src="item.contentImage"></v-img>
      <div class="created-on mx-2 text-subtitle-1">{{ formatDate(item.createdOn) }}</div>
      <v-card-title class="px-2 text-break">{{ item.contentTitle }}</v-card-title>
      <v-btn small class="ma-2" outlined color="secondary" @click="openArticle">Read more</v-btn>
    </div>

    <v-select
      ref="topics"
      v-model="selectedTopics"
      chips
      deletable-chips
      label="Select Topics"
      :items="topics"
      multiple
      class="mt-5 mx-2"
      clearable
    ></v-select>

    <v-select
      ref="primaryTopics"
      v-model="selectedPrimaryTopics"
      chips
      deletable-chips
      label="Primary Topics"
      :items="primaryTopics"
      multiple
      class="mt-5 mx-2"
      clearable
    ></v-select>

    <v-btn
      x-large
      color="error"
      dark
      class="delete-button"
      :loading="loading"
      :disabled="loading"
      @click="handleDelete"
    >
      Delete
    </v-btn>

    <v-btn
      x-large
      color="success"
      dark
      class="submit-button"
      :loading="loading"
      :disabled="loading"
      @click="handleSubmit"
    >
      Approve and Submit
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">Alert</v-card-title>
        <v-card-text class="text-break">Changes you made were successful</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleDialogClick">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    props: {
      contentItem: {
        type: Object,
        required: true,
      },
      primaryTopics: {
        type: Array,
        required: true,
      },
      index: Number,
    },
    data() {
      return {
        item: '',
        topics: [],
        selectedTopics: [],
        selectedPrimaryTopics: [],
        menuOpen: false,
        dialog: false,
        loading: false,
        currnetOperation: undefined,
      };
    },
    watch: {
      contentItem: {
        handler(item) {
          this.item = structuredClone(item);
          console.log('structuredClone', structuredClone(item));
        },
        immediate: true,
      },
    },
    created() {
      this.topics = this.item.topics.map(({topic}) => topic);
      this.selectedTopics = this.item.topics.filter(({isApproved}) => isApproved).map(({topic}) => topic);
      this.selectedPrimaryTopics = this.item.primaryTopics
        ?.filter(({isApproved}) => isApproved)
        .map(({topic}) => topic);
    },
    mounted() {
      this.$refs.card.$el.closeMenuMethod = this.closeMenu;
    },
    methods: {
      formatDate(date) {
        return DateTime.fromJSDate(new Date(date)).toFormat('dd LLL yyyy, h:m a');
      },
      openArticle() {
        window.open(this.item.contentUrl, '_blank', 'location=yes');
      },
      closeMenu() {
        this.$refs.topics.blur();
        this.$refs.primaryTopics.blur();
      },
      handleSubmit() {
        this.currnetOperation = 'submit';
        this.loading = true;
        Meteor.call(
          'approveTopicsForContentItem',
          this.item._id,
          this.selectedTopics,
          this.selectedPrimaryTopics,
          () => {
            this.loading = false;
            this.dialog = true;
          },
        );
      },
      handleDelete() {
        this.currnetOperation = 'delete';
        this.loading = true;
        Meteor.call('deleteContentItem', this.item._id, () => {
          this.loading = false;
          this.dialog = true;
        });
      },
      handleDialogClick() {
        if (this.currnetOperation === 'delete') {
          this.$emit('deleteItem', this.index);
        }
        this.dialog = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .moderator-form-container {
    height: 100vh;
    width: 100vw;
    background: white;
    position: relative;
    .submit-button {
      position: absolute;
      bottom: 16px;
      right: 16px;
      left: 16px;
    }
    .delete-button {
      position: absolute;
      bottom: 80px;
      right: 16px;
      left: 16px;
    }
  }
  .content-title-container {
    font-size: 20px;
    font-weight: 400;
    width: 100%;
    .content-image {
      text-align: center;
      img {
        height: 200px;
        width: 100%;
      }
    }
  }
</style>
