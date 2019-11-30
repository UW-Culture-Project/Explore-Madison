var mongoose = require("mongoose");

// Schema setup
var eventSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  location: String
  // eventDate: Date
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;
