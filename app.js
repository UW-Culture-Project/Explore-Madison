var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Event = require("./models/event");

mongoose.connect("mongodb://localhost/culture_project");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

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
});

app.listen(3000, function() {
  console.log("Server is listening.");
});
