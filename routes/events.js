var express = require("express"),
    router  = express.Router(),

    // Models
    Event   = require("../models/event");


//==========================================================
// Event Routes
//==========================================================

// INDEX ROUTE - Shows all events
router.get("/", function (req, res) {
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
router.get("/new", isLoggedIn, function (req, res) {
    res.render("events/new");
});

// CREATE ROUTE - only create a new event if the user is logged in
router.post("/", isLoggedIn, function (req, res) {

    // Sanitize the event so no Script tags can be run
    req.body.event.body = req.sanitize(req.body.event.body);
    var name = req.body.event.name;
    var image = req.body.event.image;
    var desc = req.body.event.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var location = req.body.event.location;
    var startDate = req.body.event.startDate;
    var endDate = req.body.event.endDate;
    var newEvent = {name: name, image: image, description: desc, author: author, location: location, startDate: startDate, endDate: endDate};
    console.log(newEvent);
    Event.create(newEvent, function (err, event) {
        if (err) {
            res.redirect("/events/new");
        } else {
            res.redirect("/events");
        }
    });
});

// SHOW individual event
router.get("/:id", function (req, res) {
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