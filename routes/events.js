var express = require("express"),
    router  = express.Router(),
    Event   = require("../models/event");


//==========================================================
// Event Routes
//==========================================================

// INDEX ROUTE - Shows all events
router.get("/events", function (req, res) {
    Event.find({}, function (err, events) {
        if (err) {
            console.log(err);
        } else {
            res.render("events/index", {
                events: JSON.stringify(events)
            });
        }
    });
});

// SHOW - create event page only if the user is logged in
router.get("/events/new", isLoggedIn, function (req, res) {
    res.render("events/new");
});

// CREATE ROUTE - only create a new event if the user is logged in
router.post("/events", isLoggedIn, function (req, res) {
    // Sanitize the event so no Script tags can be run
    req.body.event.body = req.sanitize(req.body.event.body);
    console.log(req.body.event);
    Event.create(req.body.event, function (err, event) {
        if (err) {
            res.redirect("/events/new");
        } else {
            res.redirect("/events");
        }
    });
});

// SHOW individual event
router.get("/events/:id", function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
        } else {
            res.render("events/show", {
                event: event
            });
        }
    });
});

// Middleware function for checking if a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;