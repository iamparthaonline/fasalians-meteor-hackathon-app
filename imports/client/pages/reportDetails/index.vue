<template>
  <div class="report-details-container">
    <TopNavBar title="Plant Health Report" :is-back-button="true" />
    <div class="plant">
      <img :src="report && report.image || 'lazy-pic.jpeg'" alt="" />
    </div>
    <div v-if="report" class="details-card">
      <div class="crop-icon">
        <img :src="`/crop-icons/${report.crop}.png`" alt="" />
      </div>

      <div class="status">{{ report.report.status }}</div>
      <div class="heading">🐞 Diseases with probability</div>
      <ul>
        <li v-for="disease in report.report.diseases" :key="disease[0]">
          {{ disease[0].replace('_', ' ') }} -
          <strong>{{ parseFloat(disease[1]).toFixed(2) }}%</strong>
        </li>
      </ul>
      <p class="process">
        Processed on -
        <i>{{ report.cropname }}</i>
      </p>

      <div class="generate">
        {{ getFormattedDate(report.createdAt) }}
      </div>
    </div>
  </div>
</template>

<script>
  import TopNavBar from '../../components/topNavBar.vue';

  export default {
    components: {TopNavBar},
    data() {
      return {
        report: undefined,
        loading: true,
      };
    },
    beforeCreate() {
      Meteor.call('getPlantHealthReport', this.$route.params.id, async (err, result) => {
        if (!err) {
          console.log('result', result);
          const string = result.crop.toLowerCase().replace('_', ' ');
          result.cropname = string.charAt(0).toUpperCase() + string.slice(1);
          this.report = result;
        }
      });
    },
    methods: {
      goToFasal() {
        window.open('https://fasal.co', '_blank', 'location=yes');
      },
    },
  };
</script>

<style lang="scss">
  .report-details-container {
    background-color: #f8f8f8;
    padding-bottom: 30px;
    position: relative;
    .plant img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin: 0 !important;
    }
    .details-card {
      background-color: #fff;
      box-shadow: rgba(193, 193, 193, 0.2) 0px 2px 10px;
      top: -50px;
      margin: 10px 20px;
      border-radius: 10px;
      padding: 20px;
      position: relative;
      .process {
        margin: 10px 0 !important;
      }
      .crop-icon {
        position: absolute;
        top: -25px;
        right: 10px;
        display: inline-block;
        border-radius: 10px;
        padding: 10px;
        background: #fff;
        box-shadow: rgba(193, 193, 193, 0.2) 0px 2px 10px;
        padding: 5px 10px;
        img {
          width: 32px;
          height: 32px;
          margin: 0 !important;
        }
      }

      .status {
        font-size: 24px;
        text-transform: capitalize;
        font-weight: bold;
      }
      ul {
        border-bottom: 1px solid #eee;
        padding: 15px 0 !important;
        margin-bottom: 15px;
        list-style: disc;
        padding-left: 20px !important;
      }
      .heading {
        margin-top: 15px !important;
        color: #444;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .doctor-card {
      border-radius: 10px;
      padding: 20px;
      position: relative;
      margin: 10px 20px 30px;
      background: #fff;
      img {
        height: 200px;
        width: 200px;
      }
      position: relative;
      top: -40px;
    }
  }
</style>
