import Vue from 'vue';
import {DateTime as luxon} from 'luxon';
import '../imports/client/plugins/index';
import '../imports/client/mixins/index';
import '../imports/client/components/index';
import App from '../imports/client/App.vue';
import router from '../imports/client/router';
import vuetify from '../imports/client/plugins/vuetify';
import 'swiper/swiper-bundle.min.css';

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
    universalLinks.subscribe('sharePost', function (eventData) {
      const shareParameters = eventData.path.split('/post')[1];
      alert(`shareEvent: ${JSON.stringify(eventData)}`);

      if (shareParameters) {
        const linkToOpen = `/post${shareParameters}`;
        router.push({path: linkToOpen});
      }
    });
  }
});
