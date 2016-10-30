//////////////////////////////////
// Import packages
/////////////////////////////////
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var passport = require("passport");
var passportJwt = require("./config/passport-jwt-cfg");


////////////////////////////////
// Router files
///////////////////////////////
var itemsRoute = require("./routes/route-items"); //item route
var indexRoute = require("./routes/route-index"); //index to angular
var userRoute = require("./routes/route-user"); //authentication

// new express application
var app = express();

///////////////////////////////////
// Body parsers
/////////////////////////////////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



//USAGE OF CORS - CROSS DOMAIN RESPONSE SERVICE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//initialize passport
app.use(passport.initialize());

///////////////////////////////////
// Views folder
//////////////////////////////////
app.use("/public",express.static(path.join(__dirname,"client/dist")));
app.use("/static",express.static(path.join(__dirname,"client")));

app.set("views",path.join(__dirname,"client/app"));
app.set("view engine","ejs");
// specify that we want to render .html files using ejs renderfile
app.engine("html",require("ejs").renderFile);


// Connect to mongoDb using mongoose ORM
mongoose.connect("mongodb://localhost/shopping_list");

//configure passport to use jwt
passportJwt(passport);

app.use("/",indexRoute);
app.use("/api/items",passport.authenticate("jwt", { session: false }),itemsRoute); //access to api needs to be authenticated
app.use("/api/user",userRoute); //route for registering



app.listen(8001,function(){
    console.log("Server listening on 8001");
});