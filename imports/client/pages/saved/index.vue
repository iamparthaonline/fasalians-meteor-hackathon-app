<template>
  <div class="parent">
    <div class="child">
      <TopNavBar title="Saved" :is-back-button="true" />

      <div v-if="isLoading">
        <ContentLoader v-for="i in 3" :key="i" />
      </div>
      <ContentCard v-for="(cardData, index) in result" :key="index" :card-data="cardData.contentDesc" />
      <!-- <ToastContainer :notification-data="notifiData" /> -->
    </div>
  </div>
</template>

<script>
  import ContentCard from '../../components/contentCard.vue';
  //   import ToastContainer from '../../components/toastContainer.vue';
  import TopNavBar from '../../components/topNavBar.vue';
  import ContentLoader from '../../components/contentLoader.vue';

  export default {
    components: {
      ContentCard,
      //   ToastContainer,
      TopNavBar,
      ContentLoader,
    },
    data() {
      return {
        result: [],
        notifiData: {
          label: 'Hello',
          actionLabel: 'World',
        },
        isLoading: false,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      };
    },
    mounted() {
      this.isLoading = true;
      Meteor.call('savedContents', (err, response) => {
          console.log(response);
        this.result = response;
        this.isLoading = false;
      });
    },
    methods: {
      explore() {
        this.$router.push('./article');
      },
      updated() {
        Meteor.call('getSavedContents', Meteor.user()._id, (err, response) => {
          this.result = response;
        });
      },
    },
  };
</script>

<style scoped>
  .child {
    padding: 10px;
  }
</style>
