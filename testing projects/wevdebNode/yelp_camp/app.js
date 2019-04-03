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

//Requireing ROutes
var commentRoutes = require("./routes/comments"),
    campergroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//seedDB(); //Seed the database
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
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next()
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Using Routes
app.use(indexRoutes);
app.use("/campgrounds", campergroundRoutes);
app.use("/campgrounds/:id/comments" , commentRoutes);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname is a constants that has the local direction of the project
console.log(__dirname);

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//login route
// logic route

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
})


app.use(bodyParser.urlencoded({
    extended: true
}));


//SCHEMA SETUP




// ==========================
// COMMENTS ROUTES
// ==========================

// ==========================
// AUTH ROUTES
// ==========================



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
