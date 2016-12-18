var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";


exports.addcart = function(req, res){
	
	var name=req.param("name");
    var productid = req.param("productid");
    console.log("---------------"+req.param("productid"));
	var price=req.param("price");
	var quantity=req.param("quantity");
    var quantityincart=req.param("quantityincart");
	//logger.log('info', "User with userid: "+req.session.userid+" adding product to cart");
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = mongo.collection('cart');
        var product = mongo.collection('product');


        cart.insert({
            "_id": productid,
            "name": name,
            "price": price,
            "quantityincart": quantityincart,
            "total":price*quantityincart,
            "quantity":quantity,
            "buyer_email":req.session.email
        }, function (err, cart){
            if(cart){
                console.log("Product added to cart");
                res.send(cart);
            }else{
                console.log("Error occurred");
            }
        })


    });

};