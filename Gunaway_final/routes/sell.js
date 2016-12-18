var mysql = require('mysql');
var sqldb = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";
var winston = require('winston');
var moment = require('moment');

// var logger = new (winston.Logger)({
// 	transports: [
// 		new (winston.transports.Console)(),
// 		new (winston.transports.File)({ filename: 'ebayLog.log' })
// 	]
// });

exports.sellitem = function(req,res){
	var name = req.param("name");
	var description = req.param("description");
	var price = req.param("price");
	var quantity = req.param("quantity");
	var isCreated=Date.now()/1000;
	var shippedfrom = req.param("shippedfrom");
    var checkrequired = req.param("checkrequired");

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');

        product.insert({
            "name": name,
            "description": description,
            "price": price,
            "quantity": quantity,
            "isCreated":isCreated,
            "isStopped":null,
            "shippedfrom":shippedfrom,
            "seller_email":req.session.email,
            "buyer_email":null,
            "forBid":0,
            "checkrequired":checkrequired
        }, function (err, user) {
            if (user) {

                console.log("Product registered");
				//alert("Your product has been posted!");
				res.render('homepage');
            } else {
                console.log("returned false");
                console.log("Error in registering user");

            }

        })

    });
}

exports.postbid = function(req,res) {
    var name = req.param("name");
    var description = req.param("description");
    var price = req.param("price");
    var isCreated = Date.now() / 1000;
    var quantity = req.param("quantity");
    var shippedfrom = req.param("shippedfrom");

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');

        product.insert({
            "name": name,
            "description": description,
            "price": price,
            "quantity": quantity,
            "isCreated": isCreated,
            "isStopped": isCreated+345600000,
            "shippedfrom": shippedfrom,
            "seller_email": req.session.email,
            "buyer_email":null,
            "forBid":1
        }, function (err, user) {
            if (user) {

                console.log("Product registered");
                //alert("Your product has been posted!");
                res.render('homepage');
            } else {
                console.log("returned false");
                console.log("Error in registering user");

            }

        })



    });
}

exports.sell = function(req,res){

	res.render('sell');
}