var express = require("express");
var app = express();
app.get("/", function(req, res) {
	res.send("Welcome to my assignment");
});
app.get("/speak/:animal", function(req, res) {
	var animal = req.params.animal.toLowerCase();
	var sound = {
		dog: "ruff",
		pig: "oink",
		cow: "moo",
		cat: "meow"
	};
	if (animal === "pig") {
		sound = "oink";
	} else if (animal === "cow") {
		sound = "moo";
	}
	res.send("The " + animal + " says: " + sound[animal]);
});
app.get("/repeat/:message/:times", function (req, res) {
	var message = req.params.message;
	var times = Number(req.params.times);
	var results = "";
	for (var i = 0; i < times; i++) {
		results += (message + " ");
	}
	res.send(results);
	
});
app.get("*", function (req, res) {
	res.send("You hit a dead end");
});

app.listen(3000, function() {
	console.log("Server is listening on port 3000");
});
