function save(userId, articleId) {
  Meteor.call('saveContent', userId, articleId, (err, response) => {
    console.log(response);
  });
}
function remove(userId, articleId) {
  Meteor.call('unsaveContent', userId, articleId, (err, response) => {
    console.log(response);
  });
}

module.exports = {save, remove};
