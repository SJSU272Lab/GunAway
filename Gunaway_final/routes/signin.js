var bcrypt = require('bcrypt-nodejs');
var winston = require('winston');
var moment = require('moment');
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

exports.check=function(req,res) {
    console.log(" aat allaaaa");
    var email = req.param("email");
    var password = req.param("password");
    var result;
    //logger.log('info', 'User trying to login in');

    console.log(email + password);
    req.session.email = email;


    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = mongo.collection('user');

        user.findOne({email:{$in: [email]}}, function(err,user){
            if(user!=undefined){
                console.log("inside findone");
                if(bcrypt.compareSync(password, user.password)) {
                    req.session.email=email;
                    console.log("Inside compareSync"+ req.session.email);
                    res.render('profile');
                }
            }
            else{
                result = {"statusCode":403};
                res.send(result);
            }

        })

    });
};

	exports.reg=function(req,res) {
        //logger.log('info', "User registering");
        var firstname = req.param("firstname");
        var lastname = req.param("lastname");
        var email = req.param("email");
        var pass = req.param("password");
        //req.session.email = email;
        var crypted = bcrypt.hashSync(pass);
        console.log(crypted);
        console.log(email);

        mongo.connect(mongoURL, function () {
            console.log('Connected to mongo at: ' + mongoURL);
            var user = mongo.collection('user');

            user.insert({
                "fname": firstname,
                "lname": lastname,
                "email": email,
                "password": crypted,
                "lastlogin":null
            }, function (err, user) {
                if (user) {
                    // This way subsequent requests will know the user is logged in.
                    //req.session.username = user.username;
                    //
                    console.log("User registered");
                   req.session.email = email;
                    console.log(req.session.email+" is having session");
                    res.render('register1');

                } else {
                    console.log("returned false");
                    console.log("Error in registering user");

                }

            })

        });

    };

	exports.reg1=function(req,res) {
        console.log("register node.js");
        var birthday = req.param("birthday");
        var handle = req.param("handle");
        var mobile = req.param("mobile");
        var place = req.param("place");

        mongo.connect(mongoURL, function () {
            console.log('Connected to mongo at: ' + mongoURL);
            var user = mongo.collection('user');

            user.update(
                {"email": req.session.email},
                {$set:
                {
                    "birthday": birthday,
                    "handle": handle,
                    "mobile": mobile,
                    "place": place
                }},
                { upsert: false },
                function (err, user) {
                    if (user) {
                        // This way subsequent requests will know the user is logged in.
                        //req.session.username = user.username;
                        console.log(req.session.email + " filling rest of the info");
                        console.log("User registration completed");
                        res.render('signin');

                    } else {
                        console.log("returned false");
                        console.log("Error in registering user");

                    }

                }
            )

        });
    };

	exports.emailnotreg = function(req, res){
		console.log("checking if email is registered: node");
		var email = req.param("email");

        mongo.connect(mongoURL, function () {
            console.log('Connected to mongo at: ' + mongoURL);
            var user = mongo.collection('user');

            user.find({"email":email}), function (err, result) {
                if (result) {

                    result = {"statusCode":202};
                    res.send(result);
                }
                else{

                    result = {"statusCode":405};
                    res.send(result);
                }

            }
        });
    };



				exports.emailreg = function(req, res) {
                    var email = req.param("email");
                    console.log(email);
                    mongo.connect(mongoURL, function () {
                        console.log('Connected to mongo at: ' + mongoURL);
                        var user = mongo.collection('user');

                        user.find({"email":email}), function (err, result) {
                            if (result) {

                                result = {"statusCode":405};
                                res.send(result);
                            }
                            else{
                                console.log(result + " Hi");
                                result = {"statusCode":202};
                                res.send(result);
                            }

                        }
                    });
                };



							exports.check_handle = function(req, res){
								console.log("checking that handle is not registered: node");
								var handle = req.param("handle");

                                mongo.connect(mongoURL, function () {
                                    console.log('Connected to mongo at: ' + mongoURL);
                                    var user = mongo.collection('user');

                                    user.find({handle:handle}, function (err, user) {
                                        if (user.length>0) {
                                            console.log("Handle already registered");
                                            result = {"statusCode": 403};
                                            res.send(result);
                                        }
                                        else {
                                            result = {"statusCode": 200};
                                            res.send(result);
                                        }

                                    })
                                });

										};


// setInterval(function () {
//     console.log('second passed');
//     mongo.connect(mongoURL, function () {
//         console.log('Connected to mongo at: ' + mongoURL);
//         var product = mongo.collection('product');
//
//         var timenow=Date.now()/1000;
//         console.log(timenow);
//         product.find({"isStopped":{$lte: timenow}, "forBid":1 }).toArray(function(err, result){
//             console.log(result);
//             if(result.length>0) {
//                 console.log("Bidding ended for: " + result);
//                 var id = new ObjectId(result[0]._id);
//                 console.log(id);
//                 product.update({"_id": id},
//                     {
//                         $set: {
//                             "quantity": 0,
//                             "forBid": 0
//                         }
//                     },{upsert: true});
//             }else{
//                 console.log("No bidding going on");
//             }
//
//     })
//     })
// }, 5000);




exports.register1 = function(req, res){
		res.render('register1');
		};
	
	
	exports.signin = function(req, res){
		res.render('signin');
		};
	
	
	