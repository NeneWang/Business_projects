var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();


const port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
})





app.use(bodyParser.urlencoded({
    extended: true
}));


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);



app.get("/", function (req, res) {
    res.render("landing");
});

app.post("/campgrounds", function (req, res) {
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

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    });
});

app.get("/campgrounds/:id", function (req, res) {
            //res.send("THIS WILL BE THE SHOW PAGE OF " + req.params.id)

            Campground.findById( req.params.id
            , function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("show", {
                        campground: campground
                    });
                }

            });

        });


        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
