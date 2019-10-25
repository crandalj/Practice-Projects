var express = require("express"),
	Campground = require("../models/campground"),
	Comment = require("../models/comment");
var middleware = require("../middleware");
var	router = express.Router({mergeParams: true});
//INDEX ROUTE
router.get("", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/campgrounds", {campgrounds: campgrounds} );
		}
	})
});

//CREATE ROUTE
router.post("/",middleware.isLoggedIn, function(req, res){
	// get data from form, add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newcampground = {name: name, image: image, desc: desc, author: author};
	Campground.create(newcampground, function(err, campground){
		if(err){
			console.log(error);
		} else{
			console.log(campground);
		}
	})
	res.redirect("/campgrounds");
});

//NEW ROUTE
router.get("/new",middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

// EDIT CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
	if(err){
		console.log(err);
	} else{
		res.render("campgrounds/edit", {campground: campground});
	}
	});
});

// UPDATE CAMPGROUND
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/");
		} else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	});
});

//SHOW ROUTE
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
		if(err){
			console.log(err);
			res.send("Error finding campground with id of " + id);
		} else {
			console.log(campground);
			res.render("campgrounds/campground", {campground: campground});
		}
	});
	
});

// DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, removedCampground){
		if(err){
			console.log(err);
		} else{
			Comment.deleteMany({_id: { $in: removedCampground.comments } }, function(err){
				if(err){
					console.log(err);
				}
			});
		}
		res.redirect("/campgrounds/");
	})
});

module.exports = router;