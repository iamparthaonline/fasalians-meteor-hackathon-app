<template>
  <div class="weather-report">
    <h1 class="state-name">
      <v-skeleton-loader class="mb-4" type="text" width="60px"></v-skeleton-loader>
    </h1>
    <div class="weather-report-child">
      <div>
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader class="mt-4" type="text" width="50px"></v-skeleton-loader>
      </div>
      <v-skeleton-loader type="avatar"></v-skeleton-loader>
    </div>
    <div class="weather-details mt-2">
      <v-skeleton-loader type="button"></v-skeleton-loader>
      <v-skeleton-loader type="button"></v-skeleton-loader>
      <v-skeleton-loader type="button"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WeatherLoader',
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
