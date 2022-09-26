<template>
  <div class="explorepage">
    <div v-if="!query.length && primaryTopicsList && primaryTopicsList.length > 0">
      <div class="filter-carousel">
        <VueSlickCarousel v-bind="settings1">
          <FilterButton
            v-for="(item, index) in primaryTopicsList"
            :key="item"
            :label="item"
            :is-active="selectedFilterIndex === index"
            @click-handler="filterContent(item, index)"
          />
        </VueSlickCarousel>
      </div>
    </div>
    <div v-else-if="query.length && filteredContents.length">
      <p class="para">Showing results for "{{ query }}"</p>
    </div>
    <div v-else>
      <p class="para">No results found for "{{ query }}"</p>
    </div>
    <div v-if="isLoading">
      <ContentLoader v-for="i in 3" :key="i" />
    </div>
    <BottomCard v-for="cardData in filteredContents" :key="cardData._id._str" :card-data="cardData" />

    <div v-if="showLoader && !query.length" id="loader">
      <div class="wrapper">
        <span class="dot"></span>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueSlickCarousel from 'vue-slick-carousel';
  import {remove, save} from '../../util/saveContent';
  import 'vue-slick-carousel/dist/vue-slick-carousel.css';
  import BottomCard from '../../components/contentCard.vue';
  import FilterButton from '../../components/filterButton.vue';
  import ContentLoader from '../../components/contentLoader.vue';
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

  export default {
    components: {
      BottomCard,
      VueSlickCarousel,
      FilterButton,
      ContentLoader,
    },
    props: {
      query: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        selectedFilterIndex: 0,
        settings: {
          swipeToSlide: true,
          swipe: true,
          focusOnSelect: true,
          initialSlide: 0,
          arrows: false,
          infinite: true,
          autoplay: true,
          centerMode: true,
          centerPadding: '20px',
        },
        settings1: {
          swipeToSlide: true,
          swipe: true,
          focusOnSelect: false,
          initialSlide: 0,
          arrows: false,
          infinite: false,
          autoplay: false,
          variableWidth: true,
          centerMode: false,
        },
        clickedCardData: undefined,
        result: [],
        search: '',
        primaryTopicsList: [
          'All',
          'Food Security',
          'Organic Products',
          'Bihar Government',
          'Ministry of Agriculture',
          'United States',
        ],
        isLoading: false,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        currentPage: 0,
        pageSize: 10,
        showLoader: true,
      };
    },
    computed: {
      filteredContents() {
        return this.result.filter(cardData => {
          return cardData.contentTitle.includes(this.query);
        });
      },
    },
    async mounted() {
      this.isLoading = true;
      this.loadFeaturedContents();
      this.loadPrimaryTopics();
      if (process.browser) {
        window.addEventListener('scroll', this.onPageScroll);
      }
    },
    methods: {
      loadFeaturedContents() {
        Meteor.call('getFeaturedContents', this.currentPage, this.pageSize, (err, response) => {
          this.result = [...this.result, ...response];
          if (response.length < 1) {
            this.showLoader = false;
          }
          this.isLoading = false;
        });
      },
      filterContent(topic, index) {
        this.isLoading = true;
        this.result = [];
        this.selectedFilterIndex = index;
        if (topic === 'All') {
          this.showLoader = true;
          this.loadFeaturedContents();
        } else {
          this.showLoader = false;
          Meteor.call('getFilterContents', topic, (err, response) => {
            this.result = response;
            this.isLoading = false;
          });
        }
      },
      saved() {
        this.$router.push('/saved');
      },
      toggleSave() {
        if (this.clickedCardData.isSaved) {
          remove(Meteor.user._id, this.clickedCardData._id);
        } else if (!this.clickedCardData.isSaved) {
          save(Meteor.user._id, this.clickedCardData._id);
        }
      },
      loadContents() {
        this.currentPage += 1;
        this.loadFeaturedContents();
      },
      isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
      },
      onPageScroll() {
        if (this.showLoader) {
          const element = document.getElementById('loader');
          if (this.isInViewport(element)) {
            this.loadContents();
          }
        }
      },
      loadPrimaryTopics() {
        Meteor.call('getPrimaryTopics', true, (err, response) => {
          this.primaryTopicsList = ['All', ...response];
        });
      },
    },
  };
</script>

<style scoped>
  .explorepage {
    background-color: transparent;
    padding: 10px;
    padding-top: 0;
    position: relative;
  }
  .search {
    width: 80vw;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border: 1px solid white;
    background-color: #1f1f1f;
  }
  .search-input {
    color: white;
    background-color: #1f1f1f;
    border: none;
    outline: none;
  }
  .search-img {
    cursor: pointer;
    height: 20px;
    width: 20px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .heading {
    margin-top: 20px;
    margin-bottom: 0;
    color: white;
    font-size: 24px;
    font-weight: bold;
  }
  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .filter-carousel {
    margin: 20px 10px;
  }
  .save {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
  .saved-contents {
    font-weight: bold;
    cursor: pointer;
    color: #48c516;
    font-size: 16px;
    margin: 0;
    margin-top: 20px;
  }
  .para {
    color: white;
  }

  .wrapper {
    width: 142px;
    height: 40px;
    /* margin: -20px 0 0 -71px; */
    filter: contrast(20);
  }
  .dot {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 12px;
    left: 5px;
    background: white;
    border-radius: 50%;
    transform: translateX(0);
    animation: dot 2.8s infinite;
  }
  .dots {
    transform: translateX(0);
    margin-top: 12px;
    margin-left: 31px;
    animation: dots 4.2s infinite;
  }
  span {
    display: block;
    float: left;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    filter: blur(1px);
    background: white;
    border-radius: 50%;
  }

  @keyframes dot {
    50% {
      transform: translateX(96px);
    }
  }
  @keyframes dots {
    50% {
      transform: translateX(-31px);
    }
  }
  #loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
