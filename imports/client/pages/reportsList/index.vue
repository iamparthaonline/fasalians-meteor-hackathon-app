<template>
    <div class="reports-list-page">
      <TopNavBar title="Previous Reports" :is-back-button="true" />
        <div class="report-card" v-for="report, index in reportsList" :key="index" @click="goToReport(report._id)">
            <div class="crop"> <img :src="`/crop-icons/${report.crop}.png`" alt="" /> {{report.cropname}} </div>
            <div>
                {{getFormattedDate(report.createdAt)}}
            </div>
        </div>
    </div>
</template>

<script>
  import TopNavBar from '../../components/topNavBar.vue';

export default {
    data(){
        return {
            reportsList: [],
            loading: true
        }
    },
    components: {
        TopNavBar
    },
    beforeCreate(){
        Meteor.call('getPlantHealthReports', this.$route.params.id, async (err, result) => {
            if(!err){
              console.log('result', result )
              result.map(({crop}, index) => {
                const string = crop.toLowerCase().replace('_', ' ');
                result[index].cropname = string.charAt(0).toUpperCase() + string.slice(1);
              })
              this.reportsList = result
            }
        })
    },
    methods: {
        goToReport(id){
              this.$router.push({path: `/report-details/${id}`})
        }
    }
}
</script>

<style lang="scss">
    .reports-list-page{
        .report-card{
            background-color: #fff;
            box-shadow: rgba(193, 193, 193, 0.2) 0px 2px 10px;
            margin: 10px 20px;
            border-radius: 10px;
            padding: 20px;
            img{
                  width: 20px;
                    padding: 0;
                    margin: 0 !important;
            }
            .crop{
                font-size: 22px;
                font-weight: bold;
            }
        }
    }
</style>