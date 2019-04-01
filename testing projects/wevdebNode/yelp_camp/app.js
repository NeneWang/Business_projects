var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    app = express(),
    seedDB = require("./seed.js");

seedDB();
const port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname is a constants that has the local direction of the project
console.log(__dirname);

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//login route
// logic route
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
})


app.use(bodyParser.urlencoded({
    extended: true
}));


//SCHEMA SETUP

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





app.get("/campgrounds", function (req, res) {

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

app.get("/campgrounds/:id", function (req, res) {
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

// ==========================
// COMMENTS ROUTES
// ==========================


app.get("/campgrounds/:id/comments/new", isLoggedIn,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })
});

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {

    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// ==========================
// AUTH ROUTES
// ==========================

//Handle sign up logic

// show register form
app.get("/register", function (req, res) {
    res.render("register");
});
//handle sign up logic
app.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});


app.get("/login", function (req, res) {
    res.render("login");
});


app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/Login"
}), function (req, res) {


});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
