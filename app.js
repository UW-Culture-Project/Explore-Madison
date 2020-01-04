var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),

    // Models
    Event         = require("./models/event"),
    User          = require("./models/user");

mongoose.connect("mongodb://localhost/culture_project");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); // __dirname is the directory that app.js is in
app.set("view engine", "ejs");
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// Passport Configuration for authentication
app.use(require("express-session")({
  secret: "Culture Project is the best!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adds this middleware to each route. Passes user info to ejs files
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// SHOW index page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/static/index.html");
});

// SHOW about page
app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/public/static/about.html");
});

// SHOW contact page
app.get("/contact", function(req, res) {
  res.sendFile(__dirname + "/public/static/contact.html");
});

//==========================================================
// Event Routes
//==========================================================

// INDEX ROUTE - Shows all events
app.get("/events", function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.render("events/index", {events: JSON.stringify(events)});
    }
  });
});

// SHOW
app.get("/events/new", function(req, res) {
  res.render("events/new");
});

// CREATE ROUTE
app.post("/events", function(req, res) {
  console.log(req.body.event);
  Event.create(req.body.event, function(err, event) {
    if (err) {
      res.redirect("/events/new");
    } else {
      res.redirect("/events");
    }
  });
});

// SHOW individual event
app.get("/events/:id", function(req, res) {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.render("events/show", {event: event});
    }
  });
});

//==========================================================
// AUTH Routes
//==========================================================

// SHOW registration form






// Middleware function for checking if a user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function() {
  console.log("Server is listening.");
});
