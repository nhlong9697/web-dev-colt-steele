var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
		{name: "Salmon Creek", image:"https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c732878dd944cc359_340.png"},
		{name: "Granite Hill", image:"https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c732878dd944cc359_340.jpg"},
		{name: "Mountain Goat", image:"https://cdn.pixabay.com/photo/2019/06/28/03/07/camping-4303359_960_720.jpg"},
		{name: "Salmon Creek", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c732878dd944cc359_340.jpg"},
		{name: "Granite Hill", image:"https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744f722c72d7964bc4_340.jpg"},
		{name: "Mountain Goat", image:"https://cdn.pixabay.com/photo/2019/06/28/03/07/camping-4303359_960_720.jpg"}
	];	
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req ,res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds array
	var name = req.body.campName;
	var image = req.body.campImage;
	var newCampGround = {name:name, image:image};
	campgrounds.push(newCampGround);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
	res.render("new");	 
}); 

app.listen(3000, function(req, res) {
	console.log('server listening to port 3000');
});
