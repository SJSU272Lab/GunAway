var moment = require('moment');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var winston = require('winston');

// var logger = new (winston.Logger)({
// 	transports: [
// 		new (winston.transports.Console)(),
// 		new (winston.transports.File)({ filename: 'ebayLog.log' })
// 	]
// });

exports.logout = function(req,res){
	var lastlogin = moment().format('LLLL');
	console.log(lastlogin);
    console.log(req.session.email);
	mongo.connect(mongoURL, function () {
		console.log('Connected to mongo at: ' + mongoURL);
		var user = mongo.collection('user');

		user.update(
			{"email": req.session.email},
			{$set:
			{
				"lastlogin":lastlogin
			}},
			{ upsert: false },
			function (err, user) {
				if (user) {
					// This way subsequent requests will know the user is logged in.
					//req.session.username = user.username;
					console.log("User logged out");
                    req.session.destroy();
					res.render('signin');

				} else {
					console.log("returned false");
					console.log("Error in log out");

				}

			}
		)

	});

};