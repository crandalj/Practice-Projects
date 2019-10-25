var mongoose = require("mongoose"),
	passport = require('passport'),
	passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	comment: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);