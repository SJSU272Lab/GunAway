var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.logininfo = function(req, res){
	mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var user = mongo.collection('user');
        user.findOne({email:req.session.email}, function(err, user){
            if(user){
                console.log("Showing user's profile");
                console.log(user);
                res.send(user);
            }
            else{
                console.log("Error occured while showing user profile");

            }


        })

    });
	// var query = "select * from user where email='"+req.session.email+"'";
	// sqldb.fetchData(function(err,results){
	// 	if(err){
	// 		logger.log('error',"Query: " +query);
	// 		console.log("In error");
	// 		throw err;
	// 	}
	// 	else{
	// 		console.log("logininfo retrieved");
	// 		console.log(results);
	// 		res.send(results);
	// 		//res.render('profile');
	//
	// 	}
	// 		    },query);

};

exports.getlogininfo = function(req,res){
	logger.log('info', "User with userid: "+req.session.userid+" checking their login info");
	res.render('logininfo');
};