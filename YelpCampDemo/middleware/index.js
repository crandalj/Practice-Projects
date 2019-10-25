// MIDDLEWARE CODE
var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("back");
		} else{
			
			if(!campground){
				req.flash("error", "Campground not found!");
				return res.redirect("back");
			}
			
			if(campground.author.id.equals(req.user._id)){
				next();
			} else{
				console.log("You do not own this campground!");
				res.redirect("back");
			}
		}
		});
	} else{
		console.log("Need to be signed in");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else{
			
			if(!comment){
				req.flash("error", "Comment not found!");
				return res.redirect("back");
			}
			
			if(comment.author.id.equals(req.user._id)){
				next();
			} else{
				console.log("You do not own this comment!");
				res.redirect("back");
			}
		}
		});
	} else{
		console.log("Need to be signed in");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login");
	res.redirect("/login");
}

module.exports = middlewareObj;