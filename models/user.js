var mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

// Schema setup
var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Adds passportLocalMongoose methods to UserSchema
UserSchema.plugin(passportLocalMongoose);

// module.exports allows us to use this schema in app.js
module.exports = mongoose.model('User', UserSchema);
