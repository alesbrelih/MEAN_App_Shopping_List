//////////////////////////////////////////
// --------- USER MODEL SCHEMA ----------
/////////////////////////////////////////

///import mongoose
var mongoose = require("mongoose");

//declase usage of schema
var Schema = mongoose.Schema;

//import crypto for hashing password
var crypto = require("crypto");

//import jsonwebtoken
var jwt = require("jsonwebtoken");

var config = require("../config/properties");


////////////////////////////
// User schema
///////////////////////////////
var UserSchema = new Schema(
    {
        email: {
            type:String,
            required: true,
            unique: true
        },
        name:{
            type: String
        },
        password:{
            type:String,
            required:true
        },
        salt:{
            type: String,
            required: true
        }
    }
);
//because we dont save password directly to DB
//we hash the password with randomly generated salt
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto.pbkdf2Sync(password,this.salt,1000,64,"sha512").toString("hex");
};

//to check password we hash the input with same salt and check if
//hashes match

UserSchema.methods.checkPassword = function(password,cb){
    password = crypto.pbkdf2Sync(password,this.salt,1000,64,"sha512").toString("hex");
    if(password === this.password){
        return cb(null,true);
    }
    return cb("Password do not match");
};

//method to generate jwt token

UserSchema.methods.generateJwt = function(){
    //expiration date in seconds to pass
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDay()+7);
    var expirationDateInSecondsPassed = parseInt(expirationDate/1000);

    //returns jwt
    return jwt.sign({
        _id: this._id, //id
        expiresIn: expirationDateInSecondsPassed}, //expire in s
        config.secret //secret
        );
};

////////////////////////////
// Export schema
//////////////////////////

UserSchema = mongoose.model("User",UserSchema);
module.exports = UserSchema;