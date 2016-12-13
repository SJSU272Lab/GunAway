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

exports.getcart = function(req, res){
	mongo.connect(mongoURL, function () {
		console.log('Connected to mongo at: ' + mongoURL);
		var cart = mongo.collection('cart');

		cart.find({buyer_email:req.session.email}).toArray(function (err, cart){
			if(cart){
				console.log("Heyyy "+cart+" jfjffj");
		            res.send(cart);
				}else{
				    console.log("Error occurred");
            }
        })

		})

};

exports.removeitem = function(req, res){
    var id = require('mongodb').ObjectId(req.param("product_id"));
    var id1 = req.param("product_id");
	console.log(id);
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = mongo.collection('cart');
        cart.remove({_id:id1});
        res.render("cart");
        });
	
};

exports.checkout = function(req, res) {
    var getcartitems = req.param("getcartitems");

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = mongo.collection('cart');
        for (i = 0; i < getcartitems.length; i++) {
            var id = getcartitems[i]._id;
            console.log(getcartitems[i].quantityincart+"  " + getcartitems[i]._id +"  "+ id);
            cart.update({_id: id},
                {
                    $set: {
                        "quantityincart": getcartitems[i].quantityincart
                        //"total": getcartitems[i].total
                    }
                }, {upsert: true},
                function (err, user) {
                    if (user) {
                        res.render('payment');
                    } else {
                        console.log("Error occured");


                    }

                }
            );


        }

    });
};

exports.payment=function(req,res){
	res.render("payment");
}


exports.cart=function(req,res){
	//logger.log('info', "User with userid: "+req.session.userid+" checking their cart");
	res.render("cart");
}