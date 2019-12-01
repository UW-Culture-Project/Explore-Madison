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
  res.sendFile(__dirname + "/public/static/index.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/public/static/about.html");
});

app.get("/contact", function(req, res) {
  res.sendFile(__dirname + "/public/static/contact.html");
});

app.get("/events", function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.render("events/index", {events: JSON.stringify(events)});
    }
  });
});

app.get("/events/new", function(req, res) {
  res.render("events/new");
});

app.post("/events", function(req, res) {
  Event.create(req.body.event, function(err, event) {
    if (err) {
      res.redirect("/events/new");
    } else {
      // res.redirect("/events/show/" + event._id);
      res.redirect("/events");
    }
  });
});

app.get("/events/:id", function(req, res) {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.render("events/show", {event: event});
    }
  });
});

app.listen(3000, function() {
  console.log("Server is listening.");
});
