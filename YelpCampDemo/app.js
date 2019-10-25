var express = require("express"),
	app = express(),
	bp = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	seedDB = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
		secret: "super secret secret thing",
		resave: false,
		saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

//Passes User info from session to each route so we know if people are signed in or not
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.info = req.flash("info");
	next();
});

// ROUTES 
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// SERVER START

app.listen(3030, function(){
	console.log("YelpCampDemo listening on port 3030...");
});