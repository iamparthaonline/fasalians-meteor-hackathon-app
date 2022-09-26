<template>
  <div class="mb-10">
    <v-card
      v-for="article in articles"
      :key="article.id"
      class="mx-auto mb-3"
      max-width="400"
      light
      ripple
      @click="openArticle(article.link)"
    >
      <v-img
        class="white--text align-end"
        lazy-src="lazy-pic.jpeg"
        height="200px"
        :src="article._embedded['wp:featuredmedia'][0].source_url"
      ></v-img>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      articles: Array,
    },
    methods: {
      openArticle(contentUrl) {
        window.open(contentUrl, '_blank', 'location=yes');
      },
    },
  };
</script>

<style></style>
