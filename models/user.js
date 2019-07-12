var mongoose = require("mongoose");
var passportLocalMoongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMoongoose);

module.exports = mongoose.model("User", userSchema);