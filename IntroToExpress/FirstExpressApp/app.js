var express = require('express');
var app = express();

app.get("/", function (get,res) {
	//what to send back when you want to get something from homepage
	res.send("Hi there");
});
app.get("/bye", function(get,res) {
	res.send("Goodbye");
});
app.get("/dog", function(get,res) {
	res.send("Ruff");
});
//Tell Express to listen for requests to start server
app.listen(3000, function() {
	console.log('Server listening on port 3000');
});