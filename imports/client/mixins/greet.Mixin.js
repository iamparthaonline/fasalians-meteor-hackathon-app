import Vue from 'vue';
import {DateTime} from 'luxon';

Vue.mixin({
  methods: {
    getCurrentGreetingsMessage() {
      const currentHour = DateTime.fromJSDate(new Date()).setLocale('en-IN').toFormat('HH');
      console.log(currentHour);
      if (currentHour >= 5 && currentHour < 12) {
        return 'Good Morning';
      }
      if (currentHour >= 12 && currentHour < 17) {
        return 'Good Afternoon';
      }
      if (currentHour >= 17 && currentHour < 19) {
        return 'Good Evening';
      }
      return 'Hello';
    },
  },
});
