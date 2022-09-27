import {digest} from '../collections';

Meteor.methods({
  saveDigestForm(formTitle, formNational, formInternational, formMiscellaneous, formEditorNote, todaysDate) {
    digest.insert({
      userId: Meteor.user()._id,
      date: todaysDate,
      title: formTitle,
      national: formNational,
      international: formInternational,
      miscellaneous: formMiscellaneous,
      editorNote: formEditorNote,
      createdAt: new Date(),
    });
  },
  getTodaysDigest(date) {
    return digest.findOne({date});
  },
  getLatestDigestContent() {
    const result = digest.aggregate([
      {
        $sort: {createdAt: -1},
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: 'contents',
          localField: 'national',
          foreignField: '_id',
          as: 'national_docs',
        },
      },
      {
        $lookup: {
          from: 'contents',
          localField: 'international',
          foreignField: '_id',
          as: 'international_docs',
        },
      },
      {
        $lookup: {
          from: 'contents',
          localField: 'miscellaneous',
          foreignField: '_id',
          as: 'miscellaneous_docs',
        },
      },
    ]);
    return result;
  },
});
