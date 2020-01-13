var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  // Models
  Event = require('./models/event'),
  User = require('./models/user'),
  Interaction = require('./models/interaction'),
  // Routes
  eventRoutes = require('./routes/events'),
  indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/culture_project', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // __dirname is the directory that app.js is in
app.use(expressSanitizer());
app.use(methodOverride('_method'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// Passport Configuration for authentication
app.use(
  require('express-session')({
    secret: 'Culture Project is the best!',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adds this middleware to each route. Passes user info to ejs files
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Use route files
app.use('/', indexRoutes);
app.use('/events', eventRoutes);

// Starts server at port 3000
app.listen(3000, function() {
  console.log('Server is listening.');
});
