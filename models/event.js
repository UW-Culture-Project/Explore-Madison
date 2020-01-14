var mongoose = require('mongoose');

// Schema setup
var eventSchema = new mongoose.Schema({
  name: String,
  image: String,
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
  numberPeopleGoing: { type: Number, default: 0 },
  votes: { type: Number, default: 0 }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
