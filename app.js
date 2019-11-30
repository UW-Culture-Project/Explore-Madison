var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/CreateEvent", function(req, res) {
  res.render("CreateEvent");
});

app.listen(3000, function() {
  console.log("Server is listening.");
});