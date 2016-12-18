var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";

// var logger = new (winston.Logger)({
// 	transports: [
// 		new (winston.transports.Console)(),
// 		new (winston.transports.File)({ filename: 'ebayLog.log' })
// 	]
// });

exports.productdetail = function(req, res){
	//var productid = req.param("productid");
    var productid = require('mongodb').ObjectId(req.param("productid"));
    console.log(productid);
    console.log("Trying to show product detail page");
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');
        var user = mongo.collection('user');
        product.find({_id:{$in: [productid]}}).toArray(function(err, products){
            if(products) {
                // user.find({email:products[0].seller_email}).toArray(function(err, users){
                //     console.log(products[0].seller_email);
                //     if(users){
                //         //res.send(users);
                //     }else {
                //         console.log("Getting error");
                //     }
                // })
                console.log(products);
                req.session.productName = products[0].name;
                req.session.productId = products[0]._id;
                req.session.productQuantity = products[0].quantity;
                req.session.productPrice = products[0].price;
                req.session.productQuantityInCart = 1;
                req.session.productSeller = products[0].seller_email;
                req.session.productTotal = products[0].price*req.session.productQuantityInCart;
                console.log("Getting product detail page");
                res.render("productdetail.ejs",{product:products});
            }
            else{
                console.log("Getting Error");
            }
        })

    });

	// var query = "select product.name, product.description, product.price, product.product_id, product.quantity, product.shippedfrom, user.id, user.fname, user.lname, user.mobile from product join user where product.seller_id = user.id and product.product_id='"+productid+"'";
	// sqldb.fetchData(function(err,results){
	// 	if(err){
	// 		//logger.log('error',"Query: " +query);
	// 		console.log("In error");
	// 		throw err;
	// 	}
	// 	else{
	// 		//logger.log('info', "User with userid: "+req.session.userid+" checking product details");
	// 		console.log("productdetail page retrieved");
	// 		console.log(results);
	// 		res.render("productdetail.ejs",{result:results});
	// 	}
	// 		    },query);
};

exports.productbid = function(req, res) {
    var productid = req.param("productid");
    console.log(productid);
    var productid = require('mongodb').ObjectId(req.param("productid"));
    console.log(productid);
    console.log("Trying to show product detail page");
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');
        var user = mongo.collection('user');
        product.find({_id: productid}).toArray(function (err, products) {
            if (products) {
                console.log(products);
                console.log("Getting product detail page");
                console.log(product);
                res.render("productbid.ejs", {product: products});
            }
            else {
                console.log("Getting Error");
            }
        })

    });
};



// 	var query = "select product.name, product.description, product.price, product.product_id, product.quantity, product.shippedfrom, user.id, user.fname, user.lname, user.mobile from product join user where product.seller_id = user.id and product.product_id='"+productid+"'";
// 	sqldb.fetchData(function(err,results){
// 		if(err){
// 			//logger.log('error',"Query: " +query);
// 			console.log("In error");
// 			throw err;
// 		}
// 		else{
// 			//logger.log('info', "User with userid: "+req.session.userid+" checking posting a bid");
// 			console.log("productdetail page retrieved");
// 			console.log(results);
// 			res.render("productbid.ejs",{result:results});
// 		}
// 			    },query);
// };