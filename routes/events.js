var express = require('express'),
  router = express.Router(),
  // Models
  Event = require('../models/event');

//==========================================================
// Event Routes
//==========================================================

// INDEX ROUTE - Shows all events
router.get('/', function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      console.log(err);
    } else {
      res.render('events/index', {
        events: JSON.stringify(events)
      });
    }
  });
});

// NEW ROUTE - Show create event form only if the user is logged in
router.get('/new', isLoggedIn, function(req, res) {
  res.render('events/new');
});

// CREATE ROUTE - Only create a new event if the user is logged in
router.post('/', isLoggedIn, function(req, res) {
  // Sanitize the event so no Script tags can be run
  req.body.event.description = req.sanitize(req.body.event.description);
  // var name = req.body.event.name;
  // var image = req.body.event.image;
  // var desc = req.body.event.description;
  req.body.event.author = {
    id: req.user._id,
    username: req.user.username
  };
  // var location = req.body.event.location;
  // var startDate = req.body.event.startDate;
  // var endDate = req.body.event.endDate;
  // var newEvent = {
  //   name: name,
  //   image: image,
  //   description: desc,
  //   author: author,
  //   location: location,
  //   startDate: startDate,
  //   endDate: endDate
  // };
  Event.create(req.body.event, function(err, event) {
    if (err) {
      res.redirect('/events/new');
    } else {
      res.redirect('/events');
    }
  });
});

// SHOW ROUTE - Show individual event
router.get('/:id', function(req, res) {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.render('events/show', {
        event: event
      });
    }
  });
});

// UPVOTE ROUTE
router.put('/:id/upvote', isLoggedIn, function(req, res) {
  var updatedInfo = {};
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      if (event.upvoted) {
        // Already upvoted, now undo it.
        updatedInfo.upvoted = false;
        updatedInfo.votes -= 1;
      } else if (event.downvoted) {
        // Already downvoted, now flip to upvote, add 2 votes.
        updatedInfo.upvoted = true;
        updatedInfo.downvoted = false;
        updatedInfo.votes += 2;
      } else {
        // Neither upvoted or downvoted, now upvote, add 1 vote.
        updatedInfo.upvoted = true;
        updatedInfo.votes += 1;
      }
    }
  });

  Event.findByIdAndUpdate(req.params.id, updatedInfo, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/events/' + req.params.id);
    }
  });
});

// DOWNVOTE ROUTE
router.put('/:id/downvote', isLoggedIn, function(req, res) {
  var updatedInfo = {};
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      if (event.downvoted) {
        // Already downvoted, now undo it.
        updatedInfo.downvoted = false;
        updatedInfo.votes += 1;
      } else if (event.downvoted) {
        // Already upvoted, now flip to downvote, subtract 2 votes.
        updatedInfo.downvoted = true;
        updatedInfo.upvoted = false;
        updatedInfo.votes -= 2;
      } else {
        // Neither upvoted or downvoted, now downvote, subtract 1 vote.
        updatedInfo.downvoted = true;
        updatedInfo.votes -= 1;
      }
    }
  });

  Event.findByIdAndUpdate(req.params.id, updatedInfo, function(err, event) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/events/' + req.params.id);
    }
  });
});

// Middleware function for checking if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
