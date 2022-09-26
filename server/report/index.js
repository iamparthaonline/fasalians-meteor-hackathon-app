import ImageKit from 'imagekit';
import {reports} from '../collections';
import axios from 'axios';

function capitalizeFirstLetter(str) {
  const string = str.toLowerCase().replace('_', ' ');
  return string.charAt(0).toUpperCase() + string.slice(1);
}

Meteor.methods({
  processPlanHealthModel(data) {
    const {image, crop, createdAt} = data;
    const imagekit = new ImageKit(Meteor.settings.imageKit);
    const promiseResult = imagekit
      .upload({
        file: image,
        fileName: +new Date(),
        extensions: [
          {
            name: 'google-auto-tagging',
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then(response => {
        console.log('response', response);
        const requestData = {
          crop: capitalizeFirstLetter(crop),
          images: [response.url],
          userLocation: 'userLocation',
        };

        var config = {
          method: 'post',
          url: Meteor.settings.plantHealthAPI,
          headers: {
            'Content-Type': 'application/json',
          },
          data: requestData,
        };

        const final = axios(config)
          .then(function (finalResponse) {
            const id = reports.insert({
              report: finalResponse.data,
              crop,
              createdAt,
              image: response.url,
              user: Meteor.userId(),
            });
            return id;
          })
          .catch(function (error) {
            console.log('plant health error', error);
            throw new Meteor.Error(error);
          });
        return final;
      })
      .catch(error => {
        console.log('image upload error', error);
        throw new Meteor.Error(error);
      });
    return promiseResult;
  },
  getPlantHealthReport(_id) {
    return reports.findOne({
      user: Meteor.userId(),
      _id,
    });
  },
  getPlantHealthReports() {
    return reports
      .find(
        {
          user: Meteor.userId(),
        },
        {
          sort: {
            createdAt: -1,
          },
        },
      )
      .fetch();
  },
});
