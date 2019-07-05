var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


seedDB();

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
            res.render("index",{campgrounds:allCampgrounds});
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
   res.render("new.ejs"); 
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
            res.render("show.ejs", {campground:foundCampground});
        }
    });
});

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started! at port 3000");
});