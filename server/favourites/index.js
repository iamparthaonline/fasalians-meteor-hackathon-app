import {favourites} from '../collections';

Meteor.methods({
  saveContent(_id, articleId) {
    favourites.insert({
      userId: _id,
      contentId: articleId,
      addedOn: Date.now(),
    });
  },
  unsaveContent(_id, articleId) {
    favourites.remove({
      userId: _id,
      contentId: articleId,
    });
  },
  isArticleSaved(articleId) {
    const isArticle = favourites
      .find({
        userId: Meteor.user()._id,
        contentId: articleId,
      })
      .count();
    return isArticle;
  },
  savedContents() {
    console.log(Meteor.user()._id);
    const myArticles = favourites.aggregate([
      {
        $match: {
          userId: Meteor.user()._id,
        },
      },
      {
        $lookup: {
          from: 'contents',
          localField: 'contentId',
          foreignField: '_id',
          as: 'contentDesc',
        },
      },
      {
        $unwind: '$contentDesc',
      },
    ]);
    console.log(myArticles);
    return myArticles;
  },
});
