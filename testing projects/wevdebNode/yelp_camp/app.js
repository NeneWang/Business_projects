var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();


const port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true})

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);






app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render("landing");
});

app.post("/campgrounds", function (req, res) {
    // res.send("YOU HIT THE POST ROUTE !");
    var name = req.body.name;
    var imageUrl = req.body.image;
    var newCampground = {
        name: name,
        image: imageUrl
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

app.get("/campgrounds/new", function (req, res) {
    //render the form to crereate a new campground post
    res.render("new.ejs");

    var name = req.body.name;
    var imageUrl = req.body.image;
    var newCampground = {
        name: name,
        image: image
    };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});





app.get("/campgrounds", function (req, res) {

    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    
    
//    res.render("campgrounds", {
//        campgrounds: campgrounds
//    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
