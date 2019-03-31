const express = require('express')
const app = express()
const port = 3000

app.get("/",function(req,res){
   res.send("Hi There!");
});

app.get("/bye",function(req,res){
   res.send("Goodbye!");
});
app.get("/dog",function(req,res){
   res.send("GuAU!!");
});


app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName; //Esto solo para agarra esa parte del parametro
   res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT!");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))