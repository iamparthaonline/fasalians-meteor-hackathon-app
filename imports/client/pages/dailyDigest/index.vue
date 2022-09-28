<template>
  <div>
    <TopNavBar title="Agri Digest" :is-back-button="true" @handle-click="$router.push({name: 'dashboard'})" />
    <div class="digest-page-container">
      <div class="date">{{ $route.params.date }}</div>

      <h1>{{ response.title }}</h1>

      <h2 class="headings">🇮🇳 National Updates</h2>
      <div class="contents-list-container tealbg">
        <ContentCard v-for="article in national" :key="article.id" :card-data="article" />
      </div>
      <h2 class="headings">🌎 International Updates</h2>
      <div class="contents-list-container bluebg">
        <ContentCard v-for="article in international" :key="article.id" :card-data="article" />
      </div>
      <h2 class="headings">📰 Miscellaneous Updates</h2>
      <div class="contents-list-container orangebg">
        <ContentCard v-for="article in miscellaneous" :key="article.id" :card-data="article" />
      </div>
      <h2 class="headings">✍️ Editor's Note</h2>
      <p>{{ response.editorNote }}</p>

      <div class="logo-div">
        <div>
          <img class="fasal-img" src="/logo.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentCard from '../../components/contentCard.vue';
  import TopNavBar from '../../components/topNavBar.vue';

  export default {
    components: {
      ContentCard,
      TopNavBar,
    },
    data() {
      return {
        response: {},
        national: [],
        international: [],
        miscellaneous: [],
      };
    },
    mounted() {
      Meteor.call('getLatestDigestContent', (err, response) => {
        console.log('response', response);
        this.response = response[0];
        this.national.push(...response[0].national_docs);
        this.international.push(...response[0].international_docs);
        this.miscellaneous.push(...response[0].miscellaneous_docs);
      });
    },
  };
</script>

<style lang="scss" scoped>
  .digest-page-container {
    padding: 10px;
    h1 {
      font-size: 18px;
      text-align: center;
      padding: 10px;
    }
    h2 {
      font-size: 16px;
      margin-top: 20px;
      text-align: center;
    }
    .logo-div {
      display: flex;
      justify-content: center;
    }
    .fasal-img {
      width: 100px;
      height: 100px;
    }
    .date {
      text-align: center;
      font-weight: bold;
      margin: 20px 0;
    }
    .headings {
      padding: 10px;
    }
    p {
      border-radius: 5px;
      padding: 20px 15px;
      margin: 20px 0 !important;
      border: 1px solid #eee;
    }
  }
</style>
