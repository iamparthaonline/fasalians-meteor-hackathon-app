Meteor.methods({
  getTodaysWeather() {
    console.log('hello');
    try {
      console.log('Meteor.user().profile.state', Meteor.user().profile.state);
      return HTTP.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${Meteor.user().profile.state},%20india&APPID=${
          Meteor.settings.public.WEATHER_API_KEY
        }`,
      );
    } catch (error) {
      console.log('error', error);
      throw new Meteor.Error('API not fetched!');
    }
  },
});
