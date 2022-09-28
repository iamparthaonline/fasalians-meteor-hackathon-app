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
  getFilterContents(topic) {
    return contents
      .find({
        'primaryTopics.topic': topic,
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
          {$unwind: '$primaryTopics'},
          {
            $group: {
              _id: '$primaryTopics.topic',
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
  getAllContents() {
    return contents.find({}).fetch();
  },
});
