import Vue from 'vue';
import {DateTime as luxon} from 'luxon';
import '../imports/client/plugins/index';
import '../imports/client/mixins/index';
import '../imports/client/components/index';
import App from '../imports/client/App.vue';
import router from '../imports/client/router';
import vuetify from '../imports/client/plugins/vuetify';

DateTime = luxon;
Meteor.startup(() => {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    ...App,
    router,
    vuetify,
  });
  if (Meteor.isCordova) {
    window.open = cordova.InAppBrowser.open;
  }
});
