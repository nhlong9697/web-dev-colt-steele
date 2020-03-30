var express = require("express"),
		app = express(),
		mongoose = require("mongoose"),
		passport = require("passport"),
		LocalStrategy = require("passport-local"), 
		bodyParser = require("body-parser"),
		methodOverride = require("method-override"),
		Campground = require("./models/campground"),
		Comment = require("./models/comment"),
		User = require("./models/user"),
		seedDB = require("./seeds"),
		flash = require("connect-flash");
var commentRoutes = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes = require("./routes/index")

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/yelp_camp_v10");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(flash());

// seedDB();//seed the database
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
//use routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function(req, res) {
	console.log('server listening to port 3000');
});
