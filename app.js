var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

seedDB();

//==============
//passport config
//==============

app.use(require("express-session")({
    secret: "I am the Best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err)
        {
            console.log("ERROR IN FIND: ");
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err)
        {
            console.log("ERROR IN CREATE: ");
            console.log(err);           
        }
        else
        {
             //redirect back to campgrounds page
             res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err)
        {
            console.log("ITS AN FINDBYID ERROR: ");
            console.log(err);
        }
        else
        {
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});


//=================
// Comments Routes
//=================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id...
    Campground.findById(req.params.id, function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.create(req.body.comment, function(err, comment){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//=============
// AUTH ROUTES
//=============

app.get("/register", function(req, res){
    res.render("register");
});

// handle signup logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

app.get("/login", function(req, res){
    res.render("login");
});
// handle login logic

app.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function(req, res){});

// Logout LOgic
app.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started! at port 3000");
});