var express = require('express');
var app = express();

app.get("/", function (req,res) {
	//what to send back when you want to get something from homepage
	res.send("Hi Long");
});
app.get("/goodbye", function (req,res) {
	res.send("Goodbye!");
});
app.get("/dog", function(req,res) {
	res.send("Ruff");
});
app.get("/r/:subReddit", function(req,res) {
	var subReddit = req.params.subReddit;
	res.send("Welcome to" + subReddit.toUpperCase() + " subreddit");
});
//Tell Express to listen for requests to start server
app.listen(3000, function() {
	console.log('Server listening on port 3000');
});