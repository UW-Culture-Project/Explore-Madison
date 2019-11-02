var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var request = require("request");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Schema setup
var eventchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  location: String,
  eventDate: Date
});

var Event = mongoose.model("Event", eventSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/events", function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.render("events", {events: events});
    }
  });
});

app.get("/events/new", function(req, res) {
  res.render("new");
});

app.post("/events", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var location = req.body.location;
  var eventDate = req.body.eventDate;
  Event.create({name: name, image: image, description: description, location: location, eventDate: eventDate}, function(err, newlyCreated) {
    if (err) {
      res.redirect("/events/new");
    } else {
      res.redirect("/events");
    }
  });
});

app.get("/events/:id", function(req, res) {
  res.send("");
});

app.listen(3000, function() {
  console.log("Server is listening.");
});
