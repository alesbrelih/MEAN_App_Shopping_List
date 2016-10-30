//////////////////////////////////////////////////////////////////////////
// --------- ROUTES FOR USER AUTHENTICATION/AUTHORIZATION AND PROFILE INFORMATION
///////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////
// Imports
//////////////////////

//import express
var express = require("express");
//user schema
var User = require("../models/user.model");
//token header json object KEY value
var tokenHeader = require("../config/properties").tokenHeader;
//inicialize express router
var router = express.Router();

//define post route for login
router.post("/login",function(req,res){
    //get email and pass from request body
    var email_body = req.body.email;
    var password_body = req.body.password;

    //try to find matching user
    User.findOne({email:email_body},function(err,user){
        if(err) throw err; //error connecting to db
        if(!user){
            //cant find user
            res.status(400).send({message:"User not found"});
        }
        else{
            //check if password matches if user is found
            user.checkPassword(password_body,function(err,isMatch){
                if(err){
                    //pwd doesnt match
                    res.sendStatus(401);
                }
                if(!err && isMatch){
                    //no error and pws matches

                    var token = user.generateJwt();

                     //dynamic change for token key value from properties
                    var responseTokenObject = {};
                    responseTokenObject[tokenHeader] = token;

                    //status 200 with token in header
                    res.status(200).json(responseTokenObject);
                }
            });
        }
    });
});

//router for POST register new user
router.post("/register",function(req,res){
    //get all values from request body
    var email_body = req.body.email;
    var password_body = req.body.password;
    var name_body = req.body.name;

    //create new user
    var newUser = new User(
        {
            email: email_body,
            name: name_body || ""
        }
    );
    
    //hash password
    newUser.setPassword(password_body);

    //save new user
    newUser.save(function(err,user){
        if(err){ //error saving
            res.status(500).send(err);
        }
        else{
            var token = user.generateJwt();

            //dynamic change for token key value from properties
            var responseTokenObject = {};
            responseTokenObject[tokenHeader] = token;

            //status 200 with user token json
            res.status(200).json(responseTokenObject);
        }
    });
});

module.exports = router;