import {forum} from '../collections';

Meteor.methods({
  updateUserOnboardingDetails(state, role, topics) {
    Meteor.users.update(
      {_id: Meteor.userId()},
      {
        $set: {
          'profile.role': role,
          'profile.topics': topics,
          'profile.state': state,
          'profile.isOnboarded': true,
          'profile.points': 10,
          'profile.coins': 0,
          'profile.level': 0,
          'profile.reads': 0,
        },
      },
    );
  },
  updateUserDetails(_id, username, useraddress, userGender, userState) {
    Meteor.users.update(
      {_id},
      {
        $set: {
          'profile.name': username,
          'profile.address': useraddress,
          'profile.gender': userGender,
          'profile.state': userState,
        },
      },
    );
  },
  getUserProfile(userId) {
    const user = Meteor.user({}, {fields: {_id: 1}});
    if (user) {
      const userDetails = Meteor.users.findOne(
        {_id: userId},
        {
          fields: {
            'services.google.accessToken': 0,
            'services.google.idToken': 0,
            'services.google.scope': 0,
            'services.resume': 0,
            savedContents: 0,
          },
        },
      );
      userDetails.forumPostCount = forum.find({'user._id': userId}).count();
      return userDetails;
    }
    throw new Meteor.Error('ACCESS_ERROR');
  },
  followUser(toFollow) {
    const user = Meteor.user({}, {fields: {_id: 1}});
    if (user) {
      Meteor.users.update({_id: toFollow}, {$addToSet: {'profile.followers': user._id}});
      // Need to Send Notification
      // Add Points
    }
  },
  unfollowUser(toUnFollow) {
    const user = Meteor.user({}, {fields: {_id: 1}});
    if (user) {
      Meteor.users.update({_id: toUnFollow}, {$pull: {'profile.followers': user._id}});
    }
  },
});
