var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res) {
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});	
		}
	})
});


//CREATE - add new campground	to DB
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) { 
	res.render("campgrounds/new");	 
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

module.exports = router;