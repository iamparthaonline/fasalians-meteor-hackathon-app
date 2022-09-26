<template>
  <WeatherLoader v-if="isLoading" />
  <div v-else-if="weatherResult" class="weather-report" @click="showFeedback = true">
    <h1 class="state-name">
      <v-icon slot="append">mdi-map-marker-outline</v-icon>

      <strong>{{ weatherResult.name }}</strong>
    </h1>
    <div class="weather-report-child">
      <div>
        <h3 class="temp">{{ showTempInCelsius(weatherResult.main.temp) }}˚</h3>
        <p class="weather-description">{{ weatherResult.weather[0].description }}</p>
      </div>
      <img :src="`/weather-images/${weatherResult.weather[0].icon}.png`" />
    </div>
    <div class="weather-details">
      <div>
        <h3 class="weather-data">{{ weatherResult.wind.speed }}m/s</h3>
        <p class="weather-title">Wind Speed</p>
      </div>
      <div>
        <h3 class="weather-data">{{ weatherResult.main.humidity }}%</h3>
        <p class="weather-title">Humidity</p>
      </div>
      <div>
        <h3 class="weather-data">{{ weatherResult.main.pressure }}hpa</h3>
        <p class="weather-title">Pressure</p>
      </div>
    </div>
    <v-bottom-sheet v-model="showFeedback">
      <v-sheet class="text-center pa-5" height="200px">
        <div class="py-3 text-left">
          <h3>
            Feedback
            <v-chip x-small chip class="ma-2" color="green" outlined>2 Points</v-chip>
          </h3>
          <p>Do you confirm the current weather and rainfall in your place ?</p>
        </div>
        <v-btn text x-small color="blue" @click="submitFeedback()">Yes, I confirm</v-btn>
        <v-btn text x-small color="red" @click="showFeedback = false">Skip & Close</v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
  import WeatherLoader from './weatherLoader.vue';

  export default {
    components: {
      WeatherLoader,
    },
    data: () => {
      return {
        weatherResult: undefined,
        isLoading: false,
        showFeedback: false,
      };
    },
    async mounted() {
      this.isLoading = true;
      Meteor.call('getTodaysWeather', (e, res) => {
        console.log(e, res);
        this.isLoading = false;
        this.weatherResult = res?.data;
      });
    },
    methods: {
      showTempInCelsius(temp) {
        return (temp - 273.15).toFixed(0);
      },
      submitFeedback() {
        Meteor.call('trackPoints', 'GIVE_WEATHER_FEEDBACK');
        this.showFeedback = false;
      },
    },
  };
</script>

<style lang="scss">
  .location {
    height: auto;
    width: 20px;
  }
  .weather-report {
    height: auto;
    width: 100%;
    background: #fff;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 16px;
    margin: 20px 0;
  }
  .weather-report-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
    }
  }
  .weather-data {
    font-weight: 100;
    font-size: 20px;
  }
  .weather-title {
    font-size: 12px;
  }
  .weather-description {
    margin-bottom: 0;
    text-transform: capitalize;
  }
  .temp {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 44px;
  }
  .state-name {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 16px;
  }
  .weather-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h3,
  p {
    margin: 0 !important;
  }
</style>
