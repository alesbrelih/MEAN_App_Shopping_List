///////////////////////////////////////////////////
//---- PASSPORT - JWT CONFIGURATION FILE ------------
//////////////////////////////////////////////////

//TODO: CHECK RETURN VALUES ON DONE

////////////////////////////////
// Imports
////////////////////////////////

//jwt strategy
var JwtStrategy = require("passport-jwt").Strategy;

//jwt extract token from header methods
var ExtractJwt = require("passport-jwt").ExtractJwt;

//user schema
var User = require("../models/user.model");

//config with secretkey and reponse token json key value
var config = require("./properties");


//exported function dependable on passport object in main file
function configureJwtPassport(passport){

    //jwt options
    var jwtOpt = {};

    //extracts token from header with config key value
    jwtOpt.jwtFromRequest = ExtractJwt.fromHeader(config.tokenHeader);

    //sets secret to decrypt
    jwtOpt.secretOrKey = config.secret;

    //sets strategy for authentication with jwt
    passport.use(new JwtStrategy(jwtOpt,function(jwtToken,done){

        //search for user with id inside token
        User.findOne({_id:jwtToken._id},function(err,user){
            if(err)
            {
                return done(err,false); //error
            }
            if(user){
                done(null,user); //user found
            }
            else{
                done(null,false); //user wasnt found
            }
        });
        
    }));
}
module.exports = configureJwtPassport;