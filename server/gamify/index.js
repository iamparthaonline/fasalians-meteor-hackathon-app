import {DateTime} from 'luxon';
import {pointStats} from '../collections';

const GAMIFY_EVENTS = [
  {
    key: 'FORUM_POST',
    label: 'Post on Forum',
    point: 5,
    max: 2,
  },
  {
    key: 'FORUM_LIKE',
    label: 'Like on Forum Posts',
    point: 1,
    max: 5,
  },
  {
    key: 'FORUM_COMMENT',
    label: 'Comment on Forum Posts',
    point: 2,
    max: 3,
  },
  {
    key: 'READ_CONTENT',
    label: 'Read Contents in Explore',
    point: 2,
    max: 3,
  },
  {
    key: 'GET_FOLLOWED',
    label: 'If someone follows you',
    point: 10,
    max: 5,
  },
  {
    key: 'READ_DIGEST',
    label: 'Read latest digests',
    point: 5,
    max: 1,
  },
  {
    key: 'GIVE_WEATHER_FEEDBACK',
    label: 'Give feedback about weather forecast',
    point: 2,
    max: 1,
  },
];

const LEVEL_DETAILS = [
  {
    level: 1,
    points: 25,
    coins: 10,
  },
  {
    level: 2,
    points: 55,
    coins: 10,
  },
  {
    level: 3,
    points: 100,
    coins: 12,
  },
  {
    level: 4,
    points: 150,
    coins: 12,
  },
  {
    level: 5,
    points: 250,
    coins: 15,
  },
  {
    level: 6,
    points: 500,
    coins: 15,
  },
  {
    level: 7,
    points: 800,
    coins: 15,
  },
  {
    level: 8,
    points: 1200,
    coins: 20,
  },
];

Meteor.methods({
  getAllPointMakingSystem() {
    return GAMIFY_EVENTS;
  },
  getAllLevels() {
    return LEVEL_DETAILS;
  },
  getPointsHistory() {
    const userpoints = pointStats.find({user: Meteor.userId()}, {sort: {createdAt: -1}}).fetch();
    return userpoints;
  },
  trackPoints(type, userId) {
    const eventDetails = GAMIFY_EVENTS.find(({key}) => key === type);
    const createdOn = DateTime.fromJSDate(new Date()).setLocale('en-IN').toFormat('dd LLL yyyy');
    const user = userId || Meteor.userId();
    const existingTodays = pointStats.find({createdOn, type, user}).fetch();

    if (type === 'READ_CONTENT') {
      Meteor.users.update(
        {_id: user},
        {
          $set: {
            'profile.reads': (Meteor.user().profile.reads || 0) + 1,
          },
        },
      );
    }

    if (existingTodays.length < eventDetails.max) {
      pointStats.insert({
        createdOn,
        type,
        user,
        createdAt: new Date(),
      });

      const updatedPoints = (Meteor.user().profile.points || 0) + eventDetails.point;
      console.log('updatedPoints', updatedPoints);
      Meteor.users.update(
        {_id: Meteor.userId()},
        {
          $set: {
            'profile.points': updatedPoints,
          },
        },
      );
      // check level up
      const applicableLevel = LEVEL_DETAILS.findIndex(({points}) => points > updatedPoints);
      if (
        LEVEL_DETAILS[applicableLevel - 1] &&
        LEVEL_DETAILS[applicableLevel - 1].level !== Meteor.user().profile.level
      ) {
        Meteor.users.update(
          {_id: Meteor.userId()},
          {
            $set: {
              'profile.level': LEVEL_DETAILS[applicableLevel - 1].level,
              'profile.coins': LEVEL_DETAILS[applicableLevel - 1].coins + (Meteor.user().profile.coins || 0),
            },
          },
        );
      }
    }
  },
});
