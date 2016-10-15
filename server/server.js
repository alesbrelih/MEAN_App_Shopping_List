//////////////////////////////////
// Import packages
/////////////////////////////////
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var shoppingItem = require("./models/item.model");
var path = require("path");


////////////////////////////////
// Router files
///////////////////////////////
var itemsRoute = require("./routes/route-items")
var indexRoute = require("./routes/route-index");

// new express application
var app = express();

///////////////////////////////////
// Body parsers
/////////////////////////////////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


///////////////////////////////////
// Views folder
//////////////////////////////////

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// specify that we want to render .html files using ejs renderfile
app.engine("html",require("ejs").renderFile);


// Connect to mongoDb using mongoose ORM
mongoose.connect('mongodb://localhost/shopping_list');

app.use("/",indexRoute);
app.use("/api/items",itemsRoute);




app.listen(8001,function(){
    console.log("Server listening on 8001");
});