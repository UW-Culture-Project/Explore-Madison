var express  = require("express");
    router   = express.Router();
    passport = require("passport"),
    User     = require("../models/user")
    path     = require("path");

// SHOW index page
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/static/index.html'));
});

// SHOW about page
router.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/static/about.html'));
});

// SHOW contact page
router.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/static/contact.html'));
});

//==========================================================
// AUTH Routes
//==========================================================

// Show registration form
router.get("/register", function (req, res) {
    res.render("register");
});

// Handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    }) // Takes the username from the form. Don't add password
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        // Provided by passportLocalMongoose
        passport.authenticate("local")(req, res, function () {
            res.redirect("/events");
        });
    });
});

// Show login Form
router.get("/login", function (req, res) {
    res.render("login");
});

// Handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/events",
    failureRedirect: "login"
}), function (req, res) {});

// Logout route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/events");
});

// Middleware function for checking if a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;