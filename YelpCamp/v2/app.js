var express = require("express"),
		app = express(),
		mongoose = require("mongoose"),
		bodyParser = require("body-parser");
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{ 
// 		name: "Salmon Creek", 
// 		image:"https://cdn.pixabay.com/photo/2015/08/19/16/00/campfire-896196__340.jpg",
// 		description:"This is a huge granite hill, no bathrooms. No water. Beautiful granite"
// 	}, function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

//get data out of the form
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req ,res) {
	res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});	
		}
	})
});

//CREATE - add new campground	to DB
app.post("/campgrounds", function(req, res) {
	//get data from form and add to campgrounds array
	var name = req.body.campName;
	var image = req.body.campImage;
	var description = req.body.campDescription
	var newCampGround = {name:name, image:image, description:description};
	//Create new campgrounds to DB
	Campground.create(newCampGround, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect to campground
			res.redirect("/campgrounds");	
		}
	});
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) { 
	res.render("new");	 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	//find the campground with provided id
	Campground.findById(req.params.id, function(err, foundedCampground) {
		if (err) {
			console.log(err);
			//render show template with that campground
		} else {
			res.render("show", {campground: foundedCampground});
		}
	});
});

app.listen(3000, function(req, res) {
	console.log('server listening to port 3000');
});
