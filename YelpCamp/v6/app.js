var express = require("express"),
		app = express(),
		mongoose = require("mongoose"),
		passport = require("passport"),
		LocalStrategy = require("passport-local"), 
		bodyParser = require("body-parser"),
		Campground = require("./models/campground"),
		Comment = require("./models/comment"),
		User = require("./models/user"),
		seedDB = require("./seeds");

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/yelp_camp_v6");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"))

seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "vung oi mo ra",
	resave: false,
	saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

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
			res.render("campgrounds/index", {campgrounds:allCampgrounds});	
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
	res.render("campgrounds/new");	 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//================
//COMMENTS ROUTE
//================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, campGround) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campGround})
		}
	});
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
	//Lookup campground using ID
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					console.log(comment);
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect to campground show page
})

// ============
// AUTH ROUTES
// ============

//show register form
app.get("/register", function(req, res) {
	res.render("register");
})


//handle sign up logic
app.post("/register", function(req,res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/campgrounds");
		}); 
	});
});

//show login form
app.get("/login", function(req, res) {
	res.render("login");
})
//handle login logica
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res) {
	
});

//logic route
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, function(req, res) {
	console.log('server listening to port 3000');
});
