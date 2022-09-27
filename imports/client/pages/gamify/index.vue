<template>
<div class="gamify-page">
    <TopNavBar
     :is-back-button="true" 
      title="Level Details"
    />
    <main>

    <h3 class="d-flex flex-no-wrap justify-space-between align-center">
        <span>Your Level</span>
        <span class="coins">
        <v-icon small>mdi-lightning-bolt-circle</v-icon>
        {{user.profile.coins || 0}} Agri Coins
        </span>    
    </h3>
    <h4 class=" mb-2">
      <v-icon>mdi-account-box-outline</v-icon>
        Level {{user.profile.level || 0}}</h4>

    <span class="d-flex flex-no-wrap justify-space-between point-stat">
        <span>Points required for next level</span>
        <span> {{user.profile.points}} / {{nextLevelPoints}}</span>
    </span>
    <v-progress-linear
      color="teal"
      rounded
      height="7"
      :value="(user.profile.points / nextLevelPoints) * 100 "
    ></v-progress-linear>

    <br>

  <div class="text-center">
    <v-btn
        small
      @click="sheet = !sheet"
    >
        How to get points
    </v-btn>
  </div>
    <br>
   <div class="text-center point-how" v-if="sheet">
            <v-btn
            class="mt-6"
            text
            color="red"
            @click="sheet = !sheet"
            >
            close
            </v-btn>
            <div class="py-3 text-left">
                <ul class="point-tactics">
                    <li v-for="{label, point, max, key} in pointMakingTactics" :key="key">
                        <span class="d-flex flex-no-wrap justify-space-between point-name"><span>{{label}}</span><span class="point">{{point}} points</span></span>
                        <span>Maximum obtainable points per day - {{max * point}}</span>
                    </li>
                </ul>
            </div>
        </div>
  <h3>Points History</h3>
  <ul class="point-tactics" v-if="pointMakingTactics.length > 0">
    <li v-for="{type, createdAt} in pointsHistory" :key="type">
        <span class="d-flex flex-no-wrap justify-space-between point-name"><span>{{pointMakingTactics.find(({key}) => key === type).label}}</span><span class="point">{{pointMakingTactics.find(({key}) => key === type).point}} point{{pointMakingTactics.find(({key}) => key === type).point > 1 ? 's' : ''}}</span></span>
        <span>{{getAlertTime(createdAt)}}</span>
    </li>
  </ul>
    </main>
       

</div>
</template>

<script>
  import TopNavBar from '../../components/topNavBar.vue';

export default {
    components: {TopNavBar},
    data(){
        return {
            pointMakingTactics: [],
            nextLevelPoints: 0,
            pointsHistory: [],
            sheet: false
        }
    },
    meteor: {
      user: () => Meteor.user(),
    },
    created(){
        Meteor.call('getAllPointMakingSystem', (err, response) => {
            if(!err){
                console.log('response', response);
                this.pointMakingTactics = response;
            }
        });
        Meteor.call('getAllLevels', (err, response) => {
            if(!err){
                console.log('response', response);
                const applicableLevel = response.find(({level}) => level > (this.user.profile.level || 0));
                this.nextLevelPoints = applicableLevel.points;
            }
        });
        Meteor.call('getPointsHistory', (err, response) => {
            if(!err){
                console.log(response)
                this.pointsHistory = response;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
    .gamify-page{
        .point-tactics{
            height: 100%;
            overflow-y:scroll;
            span{
                font-size: 12px;
            }
            li{
                margin-bottom: 10px;
                border-bottom: 1px solid #eee;
            }
            .point-name{
                font-size: 14px;
                font-weight: bold;
            }
            .point{
                font-size: 14px;
            }
        }
        main{
            padding: 0 20px;
        }
        h3{
            margin-bottom: 15px !important;
        }
        h4{
            margin-bottom: 15px !important;
        }
        .point-stat{
            font-size: 12px;
        }
        .coins{
            font-size: 12px;
        }
    }
</style>