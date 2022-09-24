import {topics} from '../collections';

Meteor.methods({
  getPrimaryTopicsForOnboarding() {
    const primaryTopics = topics.find({isPrimary: true}).fetch();
    return primaryTopics.map(({topic}) => topic);
  },
});
