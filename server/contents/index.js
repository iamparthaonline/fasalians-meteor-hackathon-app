import {contents, topics} from '../collections';

Meteor.methods({
  getFeaturedContents(currentPage, pageSize) {
    return contents
      .find(
        {},
        {
          skip: currentPage * pageSize,
          limit: pageSize,
        },
      )
      .fetch();
  },
  getAllContents() {
    return contents.find({isApproved: true}).fetch();
  },
  getFilterContents(topic) {
    return contents
      .find({
        topics: {
          $all: [topic],
        },
      })
      .fetch();
  },
  getPrimaryTopics(dontIncludeNonArticles) {
    if (dontIncludeNonArticles) {
      const topicsWithArticles = contents
        .aggregate([
          {
            $match: {
              isApproved: true,
            },
          },
          {$unwind: '$topics'},
          {
            $group: {
              _id: '$topics.topic',
              numberOfArticles: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {numberOfArticles: -1},
          },
          {$limit: 20},
        ])
        .map(({_id}) => _id);
      console.log('topicsWithArticles', topicsWithArticles);
      return topicsWithArticles;
    }
    const primaryTopics = topics.find({isPrimary: true}).fetch();
    return primaryTopics.map(({topic}) => topic);
  },
});
