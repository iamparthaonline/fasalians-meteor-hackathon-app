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
});
