var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var	router = express.Router({mergeParams: true});

router.get("/", function(req,res){
	res.render("landing");
});

router.get("/register", function(req,res){
	res.render("register");
});

router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register", {"error": err.message});
		} else {
			passport.authenticate("local")(req,res, function(){
				req.flash("success", "Thanks for joining our camp community, " + user.username + "!");
				res.redirect("/campgrounds"); //whichever the default login landing page is
			});
		}
	});
});

router.get("/login", function(req,res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req,res){
});

router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
})

//middlware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;