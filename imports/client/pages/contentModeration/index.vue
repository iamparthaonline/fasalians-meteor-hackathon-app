<template>
  <div ref="swiper" class="content-moderation-root swiper">
    <div class="swiper-wrapper">
      <moderation-card
        v-for="(contentItem, index) in content"
        :key="contentItem._id"
        :primary-topics="primaryTopics"
        :content-item="contentItem"
        class="swiper-slide"
        :index="index"
        @deleteItem="deleteItem"
      ></moderation-card>

      <v-sheet v-if="!endOfContent" v-intersect="getNextPage" class="pa-3 swiper-slide">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-sheet>
    </div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper, {Pagination, EffectCreative} from 'swiper';

  import ModerationCard from './moderationCard.vue';

  export default {
    components: {ModerationCard},
    data() {
      return {
        content: [],
        page: 0,
        endOfContent: false,
        swiper: '',
        primaryTopics: '',
      };
    },
    mounted() {
      this.swiper = new Swiper(this.$refs.swiper, {
        spaceBetween: 0,
        observer: true,
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        modules: [Pagination, EffectCreative],
        grabCursor: true,
        effect: 'creative',
        creativeEffect: {
          prev: {
            shadow: true,
            translate: [0, '-10%', -1],
          },
          next: {
            translate: [0, '100%', 0],
          },
        },
      });
      this.swiper.on('realIndexChange', x => {
        x.slides[x.previousIndex]?.closeMenuMethod?.();
      });
    },
    methods: {
      async getNextPage([{isIntersecting}]) {
        if (isIntersecting) {
          if (!this.primaryTopics) this.primaryTopics = await this.getPrimaryTopics();
          Meteor.call('getAllUnModeratedContents', this.page, (err, res) => {
            this.page += 1;
            if (!err && res) {
              res = res.map(x => Object.freeze(x));
              this.content = [...this.content, ...res];
              if (res.length < 10) this.endOfContent = true;
            }
          });
        }
      },
      getPrimaryTopics() {
        return new Promise((resolve, reject) => {
          Meteor.call('getAllprimaryTopics', (err, res) => {
            if (!err) resolve(res);
            reject(err);
          });
        });
      },
      deleteItem(index) {
        this.content.splice(index, 1);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .swiper {
    width: 100vw;
    height: 100vh;
    .swiper-pagination {
      left: unset;
      right: 0;
    }
  }
</style>
