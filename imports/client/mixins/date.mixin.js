import Vue from 'vue';
import {DateTime} from 'luxon';

Vue.mixin({
  methods: {
    getFormattedDate(date) {
      return DateTime.fromJSDate(date).setLocale('en-IN').toFormat('dd LLLL yyyy');
    },
  },
});
