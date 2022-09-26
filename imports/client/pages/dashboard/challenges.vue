<template>
  <div>
    <div class="daily-tasks">
      <div class="task-heading d-flex flex-no-wrap justify-space-between">
        <h4>Today's Challenges</h4>
        <v-chip x-small chip class="ma-2" color="green" outlined>
          <v-icon x-small left>mdi-plus</v-icon>
          10 points
        </v-chip>
      </div>
      <ul>
        <li>
          <v-checkbox
            disabled
            label="Spend 30 Seconds in the Application"
            color="success"
            value="success"
            hide-details
          ></v-checkbox>
        </li>
        <li>
          <v-checkbox
            disabled
            label="Go through 5 Content Pieces in Explorer Page"
            color="success"
            hide-details
          ></v-checkbox>
        </li>
        <li>
          <v-checkbox disabled label="Interact with 2 Forum Posts" color="success" hide-details></v-checkbox>
        </li>
      </ul>
    </div>
    <div class="weekly-tasks">
      <div class="task-heading d-flex flex-no-wrap justify-space-between">
        <h4>Weekly Challenges</h4>
        <v-chip x-small chip class="ma-2" color="green" outlined>
          <v-icon x-small left>mdi-plus</v-icon>
          50 points
        </v-chip>
      </div>
      <ul>
        <li>
          <v-checkbox disabled label="Open the app everyday" color="success" hide-details></v-checkbox>
        </li>
        <li>
          <v-checkbox disabled label="Spend atleast 5 minutes in the app" color="success" hide-details></v-checkbox>
        </li>
        <li>
          <v-checkbox
            disabled
            label="Give feedbacks about our Weather Forecasts"
            color="success"
            hide-details
          ></v-checkbox>
        </li>
        <li>
          <v-checkbox disabled label="Post atleast one content in Forum" color="success" hide-details></v-checkbox>
        </li>
        <li>
          <v-checkbox disabled label="Refer one friend to install the app" color="success" hide-details></v-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style></style>
