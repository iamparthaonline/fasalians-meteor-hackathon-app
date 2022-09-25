import {digest} from '../collections';

Meteor.methods({
  getTodaysDigest(date) {
    return digest.findOne({date});
  },
});
