var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),

    // Models
    Event            = require("./models/event"),
    User             = require("./models/user"),

    // Routes
    eventRoutes      = require("./routes/events"),
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/culture_project");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); // __dirname is the directory that app.js is in
app.use(expressSanitizer());
app.use(methodOverride("_method"));
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
  // Sanitize the event so no Script tags can be run
  req.body.event.body = req.sanitize(req.body.event.body);
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

// Use route files
app.use(indexRoutes);
app.use(eventRoutes);

// Starts server at port 3000
app.listen(3000, function() {
  console.log("Server is listening.");
});