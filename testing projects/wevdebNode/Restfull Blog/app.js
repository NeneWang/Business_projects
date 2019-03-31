var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require('method-override');

const port = 3000;
mongoose.connect("mongodb://localhost/blog_app");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function (req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {

    res.render("index");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
