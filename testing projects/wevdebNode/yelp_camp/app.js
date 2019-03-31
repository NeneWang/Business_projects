var express = require("express");
var app = express();
const port = 3000;
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
var campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://pics.me.me/i-love-thats-lolis-and-right-i-think-flat-chests-a-2914556.png"
        },
    {
        name: "Granite Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9VeZL1DNH5rVVVogUA41bj3bgW2cy_X-0Le5l1esA2cqPwv6"
        },
    {
        name: "Salmon Creek",
        image: "https://pics.me.me/i-love-thats-lolis-and-right-i-think-flat-chests-a-2914556.png"
        },
    {
        name: "Granite Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9VeZL1DNH5rVVVogUA41bj3bgW2cy_X-0Le5l1esA2cqPwv6"
        },
    {
        name: "Salmon Creek",
        image: "https://pics.me.me/i-love-thats-lolis-and-right-i-think-flat-chests-a-2914556.png"
        },
    {
        name: "Granite Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9VeZL1DNH5rVVVogUA41bj3bgW2cy_X-0Le5l1esA2cqPwv6"
        },
    {
        name: "Salmon Creek",
        image: "https://pics.me.me/i-love-thats-lolis-and-right-i-think-flat-chests-a-2914556.png"
        },
    {
        name: "Granite Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9VeZL1DNH5rVVVogUA41bj3bgW2cy_X-0Le5l1esA2cqPwv6"
        },
    {
        name: "Salmon Creek",
        image: "https://pics.me.me/i-love-thats-lolis-and-right-i-think-flat-chests-a-2914556.png"
        },
    {
        name: "Granite Hill",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9VeZL1DNH5rVVVogUA41bj3bgW2cy_X-0Le5l1esA2cqPwv6"
        },

    {
        name: "Mountain Goat's Rest",
        image: "https://funnyanimepics.files.wordpress.com/2018/04/mitsuboshi-ep9-weapon.jpg?w=809"
        }
    ]
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
    campgrounds.push(newCampground);
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

    res.render("campgrounds", {
        campgrounds: campgrounds
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
