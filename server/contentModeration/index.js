import {contents, topics} from '../collections';

Meteor.methods({
  getAllUnModeratedContents(page = 0) {
    const user = Meteor.user();
    if (user) {
      return contents.find({isModerated: false}, {limit: 10, skip: page * 10, sort: {createdOn: -1}}).fetch();
    }
    throw new Meteor.Error('ERROR_ACCESS', 'U have to be logged in first');
  },
  getAllprimaryTopics() {
    const user = Meteor.user();
    if (user) {
      return topics.find({isPrimary: true}).map(({topic}) => topic);
    }
    throw new Meteor.Error('ERROR_ACCESS', 'U have to be logged in first');
  },
  approveTopicsForContentItem(id, approvedTopics, approvedPrimaryTopics) {
    const user = Meteor.user();
    if (user) {
      const allTopics = contents.findOne({_id: id}, {topics: 1}).topics;
      allTopics.forEach(topic => {
        if (approvedTopics.includes(topic.topic)) topic.isApproved = true;
      });
      approvedPrimaryTopics = approvedPrimaryTopics.map(topic => ({topic, isApproved: true}));
      contents.update(
        {_id: id},
        {$set: {topics: allTopics, primaryTopics: approvedPrimaryTopics, isModerated: true, isApproved: true}},
      );
      return true;
    }
    throw new Meteor.Error('ERROR_ACCESS', 'U have to be logged in first');
  },
  deleteContentItem(id) {
    const user = Meteor.user();
    if (user) {
      contents.remove({_id: id});
      return true;
    }
    throw new Meteor.Error('ERROR_ACCESS', 'U have to be logged in first');
  },
});
