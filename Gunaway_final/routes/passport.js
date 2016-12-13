/**
 * Created by vedantshete on 10/23/16.
 */

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require('./mongo');
var loginDatabase = "mongodb://localhost:27017/user";
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

module.exports = function(passport) {
    passport.use('check', new LocalStrategy(function(username, password, done) {

        console.log("Yay!! it worked!");
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                //HURRAY!! We are connected. :)
                console.log('Connection established to', url);


                // do some work here with the database.
                var collection = db.collection('User');
                var whereParams = {
                    username:username,
                    password:password
                }
                //var user1 = {FName:	'asd',LName	:	'asd', EMail	: 'asd', password	:	'asd'};

                console.log("before find!");
                collection.find({email: username, password: password}).toArray(function(err,result){
                    if(err)
                    {
                        console.log(result);
                        console.log("ERRR------------"+err);
                        //throw err;
                        db.close();
                        return done(err);
                    }
                    if(!result) {
                        console.log(result);
                        console.log("REsult not found!!!!!!!!-----");
                        return done(null, false);
                    }

                    else if(result.length)
                    {
                        console.log(result);
                        console.log("Found it  bitch!!!!!!!!-----");
                        //console.log("found user." + result[0]);
                        db.close();
                        //req.session.username = username;1
                        //response={"statusCode" : 401};
                        //res.send(response);
                        done(null, result);
                    }
                });
            }
        });
    }));
}