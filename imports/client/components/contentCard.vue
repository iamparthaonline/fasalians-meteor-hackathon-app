<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div>
    <div v-if="loadingData" class="card skeleton"></div>
    <div class="card">
      <v-card light ripple @click="openArticle">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-subtitle v-text="cardData && cardData.contentTitle"></v-card-subtitle>
          </div>

          <v-avatar class="ma-3" height="60" width="90" tile>
            <v-img cover :src="cardData && cardData.contentImage"></v-img>
          </v-avatar>
        </div>
        <v-card-actions>
          <v-btn class="ml-2" outlined rounded small>
            <v-icon class="mr-2" tiny>mdi-page-next-outline</v-icon>
            Find Out More
          </v-btn>
          <v-btn class="ml-2" outlined rounded small @click="toggleSave($event)">
            <v-icon v-if="!isSaved">mdi-bookmark-plus-outline</v-icon>
            <v-icon v-else>mdi-bookmark-plus</v-icon>
            <span v-if="!isSaved">Save</span>
            <span v-else>Saved</span>
          </v-btn>
        </v-card-actions>
      </v-card>

      <ToastContainer :notification-data="message" :show-toast="showNotification" @undo-handler="toggleSave" />
    </div>
  </div>
</template>

<script>
  import {remove, save} from '../util/saveContent';
  import ToastContainer from './toastContainer.vue';

  export default {
    components: {
      ToastContainer,
    },
    props: {
      cardData: {
        type: Object,
      },
      loadingData: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isSaved: false,
        showNotification: false,
        message: '',
      };
    },
    mounted() {
      if (!this.loadingData) {
        Meteor.call('isArticleSaved', this.cardData._id, (err, response) => {
          console.log(response);
          if (response > 0) {
            this.isSaved = true;
          }
        });
      }
    },
    methods: {
      openArticle() {
        Meteor.call('trackPoints', 'READ_CONTENT');
        window.open(this.cardData.contentUrl, '_blank', 'location=yes');
      },
      unSave() {
        this.message = 'Unsaved!';
        this.notificationToggle();
        remove(Meteor.user()._id, this.cardData._id);
        this.isSaved = false;
      },
      onSave() {
        this.message = 'Content Saved';
        this.notificationToggle();
        save(Meteor.user()._id, this.cardData._id);
        this.isSaved = true;
        this.closeNotification();
        this.$notify({
          id: 1,
          type: 'success',
          title: 'Added to favourites!',
          text: 'Undo',
        });
      },
      toggleSave(e) {
        e.stopPropagation();
        if (this.isSaved) {
          this.unSave();
        } else this.onSave();
      },
      closeNotification() {
        this.$notify.close(1);
      },
      notificationToggle() {
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      },
    },
  };
</script>

<style scoped>
  .card {
    margin-top: 10px;
    width: 100%;
    border-radius: 10px;
  }
  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
  }
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(220, 0%, 40%);
    }
    100% {
      background-color: hsl(220, 0%, 24%);
    }
  }
  .para-title {
    cursor: pointer;
    padding-right: 10px;
    padding-left: 10px;
    display: block;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
    max-height: 45px;
    visibility: visible;
    /* autoprefixer: off */
  }
  .para-title:hover {
    text-decoration: underline;
  }
  .content-div {
    position: relative;
    padding: 20px;
    gap: 15px;
    display: flex;
  }
  .image {
    border-radius: 10px;
    height: 100px;
    width: 100px;
  }
  .topics {
    background-color: #f6f6f6;
    font-size: 12px;
    margin-bottom: 0;
  }
  .save-btn {
    top: 0;
    right: 0;
    position: absolute;
    height: 30px;
    width: fit-content;
    border-radius: 3px;
    background-color: #393e46;
    border: 0;
  }
  .save-btn img {
    height: 70%;
    vertical-align: middle;
  }
  .title {
    background-color: antiquewhite;
    font-size: 12px;
    width: fit-content;
  }
  .close {
    background-color: white;
    border-radius: 3px;
    font-size: 12px;
  }
  .para-id {
    background-color: red;
  }
  button {
    border: none;
  }
</style>
