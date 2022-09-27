<template>
  <div>
    <div v-if="showReport === 'banner'" class="banner" >
      <div>
        <TopNavBar
          title="Plant Health Checker"
          icon="mdi-playlist-check"
          @handle-click="$router.push({name: 'report-list'})"
        />
        <div class="health-page">
          <img height="200px" width="200px" src="/plant.svg">
          <p class="my-5">
            Take a picture of your plant to detect diseases or pest presence and know the overall health metrics of your plant.
          </p>
            <v-btn class="ma-2" outlined color="primary" @click="showReport = 'report'">
              Scan Now
              <v-icon right>mdi-arrow-right</v-icon>

            </v-btn>
        </div>
      </div>
      <BottomNavBar active-page="report" />
    </div>
    <card
      v-else
      :card-data="cardsData[currentCard]"
      @changeCard="changeCard"
      @showPrev="showPrevCard"
      @savedDetails="getSelectedData"
      @generate-report="generateReport"
    />
    <v-alert dismissable v-if="error" type="error">
      {{error.reason}}
    </v-alert>
  </div>
</template>

<script>
  import card from './card.vue';
  import BottomNavBar from '../../components/bottomBar.vue';
  import TopNavBar from '../../components/topNavBar.vue'
  import cropArray from '../../util/crops';

  export default {
    components: {
      card,
      BottomNavBar,
      TopNavBar
    },
    data() {
      return {
        selected: {},
        cardsData: [
          {
            id: 1,
            stepNumber: 1,
            heading: 'Select the crop',
            crops: cropArray,
          },
          
          {id: 2, stepNumber: 2, heading: 'Select the image'},
          {id: 3, stepNumber: 3, heading: 'Processing the input'},
          {id: 4, stepNumber: 4, heading: 'Processing successful'},
        ],
        currentCard: 0,
        showReport: 'banner',
        error: false
      };
    },
    meteor: {
      user: () => Meteor.user(),
    },
    mounted() {
      window.scrollTo(0, 0);
    },
    methods: {
      changeCard() {
        if (this.currentCard < this.cardsData.length - 1) {
          this.currentCard += 1;
        } else {
          this.showReport = 'main';
        }
      },
      showPrevCard() {
        if (this.currentCard > 0) {
          this.currentCard -= 1;
        }
      },
      getSelectedData(value) {
        this.selected = value;
      },
      generateReport(data){
        if(data && data.image){
          this.currentCard = 2;
          data.createdAt = new Date();
          Meteor.call('processPlanHealthModel', data, async (err, result) => {
            if(!err){
              console.log('result', result )
              this.$router.push({path: `/report-details/${result}`})
            }else{
              this.error = err;
            }
          })
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .health-page {
    padding: 20px;
    padding-bottom: 100px;
    margin: auto;
    text-align: center;
    margin-top: 50px;
    img{
      margin: 20px !important;
      display: inline-block;
    }
    p {
      margin-bottom: 20px !important;
    }
  }
  
</style>
