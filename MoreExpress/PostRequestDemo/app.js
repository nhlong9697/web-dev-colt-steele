var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/friends", function(req, res) {
	res.render("friends", {friends:friends});
});

app.post("/addfriend", function(req, res) {
	var newFriend = req.body.nameOfNewFriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(3000, function() {
	console.log("server is listening on port 3000");
});