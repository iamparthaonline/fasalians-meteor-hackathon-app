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
});
