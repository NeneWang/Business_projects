var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

router.post("/", function (req, res) {
    // res.send("YOU HIT THE POST ROUTE !");
    var name = req.body.name;
    var imageUrl = req.body.image;
    var description = req.body.description;

    var newCampground = {
        name: name,
        image: imageUrl,
        description: description

    };



    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Newly created campground");
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");
});

router.get("/campgrounds/new", function (req, res) {
    //render the form to crereate a new campground post
    res.render("campgrounds/new");

    var name = req.body.name;
    var imageUrl = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});





router.get("/", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds, currentUser: req.user
            });
        }
    });
});

router.get("/:id", function (req, res) {
    //res.send("THIS WILL BE THE SHOW PAGE OF " + req.params.id)

    Campground.findById(req.params.id).populate("comments").exec(
        function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log(campground);
                res.render("campgrounds/show", {
                    campground: campground
                });
            }

        });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;