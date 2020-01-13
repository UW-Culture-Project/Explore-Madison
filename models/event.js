var mongoose = require('mongoose');

// Schema setup
var eventSchema = new mongoose.Schema({
  name: String,
  image: { type: String, default: 'https://via.placeholder.com/150' },
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  location: String,
  startDate: Date,
  endDate: Date,
  numberPeopleInterested: { type: Number, default: 0 },
  clickedInterest: { type: Boolean, default: false },
  numberPeopleGoing: { type: Number, default: 0 },
  clickedGoing: { type: Boolean, default: false },
  votes: { type: Number, default: 0 },
  upvoted: { type: Boolean, default: false },
  downvoted: { type: Boolean, default: false }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
