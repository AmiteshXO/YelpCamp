var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Lake Laky",
        image: "https://farm8.staticflickr.com/7246/7468674992_b8db31480e.jpg",
        description: "blah blah blah !!!!!"
    },
    {
        name: "Crystal Canyon",
        image: "https://farm4.staticflickr.com/3115/2673296318_42e8cd69ba.jpg",
        description: "blah blah blah !!!!!"
    },
    {
        name: "Break Point",
        image: "https://farm4.staticflickr.com/3533/3819363105_24b56afbbc.jpg",
        description: "blah blah blah !!!!!"
    }
];

function seedDB()
{   //Clear the database.
    Campground.remove({}, function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("All Campgrounds Removed!!");
            // add some campgrounds to out database as seeds.
            data.forEach(function(seed){
              Campground.create(seed, function(err, campground){
                  if(err)
                  {
                      console.log(err);
                  }
                  else
                  {
                      console.log("campground added!!!");
                      // create comments
                      Comment.create({
                          text: "This Place is Great but it Should Have Internet too !!",
                          author: "Homer"
                      }, function(err, comment){
                          if(err)
                          {
                              console.log(err);
                          }
                          else{
                              campground.comments.push(comment);
                              campground.save();
                              console.log("Comment added !!");
                          }
                      });
                  }
              });
            });
        }
    });
}

module.exports = seedDB;