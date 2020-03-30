var express = require("express");
var app = express();
//tell ejs to look at public for css?
app.use(express.static("public"));

//auto add ejs for res.render
app.set("view engine", "ejs")

//deliver "home.ejs" at home directory
app.get("/", function(req, res) {
	res.render("home");
});

//deliver "love.ejs" at /love directory
app.get("/love/:thing", function(req, res){
	var thing = req.params.thing;
	//pass a local variable to the view @thingVar is placeholder of local variable and @thing is the local variable
	res.render("love", {thingVar: thing});
});

//deliver "books.ejs" at /books directory
app.get("/books", function(req, res) {
	var books = [
		{title:"Sans Familie", author:"hector malot"},
		{title:"Sympathizer", author:"thanh"},
		{title:"les misrable", author:"victor hugo"}
	];
	res.render("books", {booksVar:books});
});

//listen on port 3000
app.listen (3000, function(req, res) {
	console.log("Sever is listening on port 3000");
});