var mongoose = require('mongoose');

// Schema setup
var interactionSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  event: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  },
  interested: { type: Boolean, default: false },
  going: { type: Boolean, default: false },
  upvoted: { type: Boolean, default: false },
  downvoted: { type: Boolean, default: false }
});

var Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
