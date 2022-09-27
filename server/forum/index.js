import ImageKit from 'imagekit';
import {forum, comments} from '../collections';

Meteor.methods({
  getAuthEndPoint(url, name, description) {
    const imagekit = new ImageKit(Meteor.settings.imageKit);
    const promiseResult = imagekit
      .upload({
        file: url,
        fileName: name,
        extensions: [
          {
            name: 'google-auto-tagging',
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      })
      .then(response => {
        const user = Meteor.user();
        const insertObject = {
          user: {_id: user._id, name: user.profile.name, image: user.services.google.picture}, // Meteor user
          description,
          imageData: response,
          createdAt: new Date(),
          likes: [],
          comments: [],
        };

        return forum.insert(insertObject);
      })
      .catch(error => {
        throw new Meteor.Error(error);
      });
    return promiseResult;
  },
  getAllForumPosts(userId) {
    if (userId) {
      const userDetails = Meteor.users.findOne({_id: userId}, {fields: {'profile.name': 1}});
      if (userDetails) {
        const posts = forum.aggregate([
          {
            $match: {
              'user._id': userId,
            },
          },
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'postId',
              as: 'Comments',
            },
          },
          {
            $addFields: {CommentCount: {$size: '$Comments'}},
          },
          {
            $project: {
              Comments: 0,
            },
          },
          {$sort: {createdAt: -1}},
        ]);
        return {posts, userDetails};
      }
    }
    return forum.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'Comments',
        },
      },
      {
        $addFields: {CommentCount: {$size: '$Comments'}},
      },
      {
        $project: {
          Comments: 0,
        },
      },
      {$sort: {createdAt: -1}},
    ]);
  },
  likeForumPost(isLiked, userId, postId) {
    if (isLiked) {
      forum.update({_id: postId}, {$push: {likes: userId}});
      // Track Points
    } else forum.update({_id: postId}, {$pull: {likes: userId}});

    return forum.findOne({_id: postId}, {fields: {likes: 1}});
  },
  postComment(postId, comment) {
    const userId = Meteor.user()._id;
    // Track Points
    return comments.insert({commentedBy: userId, postId, comment, commentedAt: new Date()});
  },
  getAllComments(postId, pageSize, pageOffset) {
    return comments.aggregate([
      {$match: {postId}},
      {
        $lookup: {
          from: 'users',
          localField: 'commentedBy',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {$unwind: '$userInfo'},
      {
        $project: {
          commenter: '$userInfo.profile.name',
          commenterImage: '$userInfo.services.google.picture',
          comment: 1,
          commentedAt: 1,
        },
      },
      {$sort: {commentedAt: -1}},
      {$skip: pageSize * pageOffset},
      {$limit: pageSize},
    ]);
  },
  getPostDetails(postId) {
    return forum.findOne({_id: postId});
  },
  getCommentCount(postId) {
    return comments.find({postId}).count();
  },
});
