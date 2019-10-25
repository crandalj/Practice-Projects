var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cliff Pines",
		image: "https://denvertent.com/wp-content/uploads/2016/12/Maroon-Bell-Tent-Main-600x400.jpg",
		desc: "Lugsail lass overhaul lad fluke chantey Jack Ketch nipper spike prow. Scallywag measured fer yer chains barkadeer marooned pirate avast gangway tender ho hands. Matey knave transom topsail trysail Chain Shot league gibbet run a shot across the bow main sheet Gally Pirate Round hornswaggle line hardtack furl brigantine strike colors crack Jennys tea cup pillage. League keel chandler Davy Jones Locker shrouds rum black spot heave down jury mast hempen halter. Dead men tell no tales jib six pounders line wherry parley port cutlass plunder jolly boat. No prey, no pay swab skysail mizzen plunder square-rigged spanker Sink me ropes end fore. Hardtack booty rutters Arr spirits loot execution dock gaff killick hang the jib. Scurvy fathom poop deck weigh anchor Spanish Main squiffy gally spanker bring a spring upon her cable ye."
	},
	{
		name: "Water Pines",
		image: "https://denvertent.com/wp-content/uploads/2016/12/Maroon-Bell-Tent-Main-600x400.jpg",
		desc: "Some place wet"
	},
	{
		name: "Ravine Pines",
		image: "https://denvertent.com/wp-content/uploads/2016/12/Maroon-Bell-Tent-Main-600x400.jpg",
		desc: "Some place high"
	}
];

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else{
			console.log("Campgrounds removed from DB");
		}
	});
	// Remove all comments
	Comment.remove({}, function(err){
		if(err){
			console.log(err);
		} else{
			console.log("Comments removed from DB");
		}
	});
	// Seed the DB for campgrounds
	// data.forEach(function(seed){
	// 	Campground.create(seed, function(err, campground){
	// 		if(err){
	// 			console.log(err);
	// 		} else{
	// 			console.log("campground added");
	// 			Comment.create({
	// 				text: "Great place",
	// 				author: "Some guy"
	// 			}, function(err, comment){
	// 				if(err){
	// 					console.log(err);
	// 				} else{
	// 					campground.comments.push(comment);
	// 					campground.save();
	// 					console.log("Created new comment");
	// 				}
	// 			})
	// 		}
	// 	});	
	// });
	
}

module.exports = seedDB;