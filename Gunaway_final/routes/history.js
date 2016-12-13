var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.getbought=function(req,res) {
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');

        product.find({buyer_email: req.session.email}).toArray(function (err, results) {

            if (err) {
                console.log("In error");
                throw err;
            } else {
                res.send(results);
            }
        });

    })
};


exports.getsold=function(req,res){
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');

        product.find({"buyer_email":{$ne:null} ,"seller_email":req.session.email}).toArray(function (err, results) {
            if (err) {
                console.log("In error");
                throw err;
            } else {
                res.send(results);
            }
        });

    })
}


exports.mysold=function(req,res){
	//logger.log('info', "User with userid: "+req.session.userid+" checking products they have sold");
	console.log("Rendering sold page");
    res.render("sold");
};

exports.mybought = function(req, res){
	//logger.log('info', "User with userid: "+req.session.userid+" checking products they bought");
    console.log("Rendering bought page");
    res.render("bought");
};