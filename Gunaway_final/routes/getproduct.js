var winston = require('winston');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";

// var logger = new (winston.Logger)({
// 	transports: [
// 		new (winston.transports.Console)(),
// 		new (winston.transports.File)({ filename: 'ebayLog.log' })
// 	]
// });

exports.getproduct = function(req,res) {
    mongo.connect(mongoURL, function (err, db) {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');
        var user = mongo.collection('user');
        console.log("Here it is");
        console.log(req.session.email);
        console.log("--------------");
       // var user_email = req.session.email + "";
        user.find({email: req.session.email}).toArray(function (err, a) {
            //console.log(a);
           // console.log(JSON.stringify(a));
            console.log(a[0].canbuygun);
            if (a[0].canbuygun == 0) {
                product.find({
                    seller_email: {$ne: req.session.email},
                    checkrequired: {$ne: "1"}
                }).toArray(function (err, product) {
                    if (product) {
                        console.log("Getting products for homepage " + product);
                        res.send(product);
                    }
                    else {
                        console.log("Error");
                    }
                });
            }
            else {
                product.find({
                    seller_email: {$ne: req.session.email}
                }).toArray(function (err, product) {
                    if (product) {
                        console.log("Getting products for homepage");
                        //console.log(product);
                        res.send(product);
                    }
                    else {
                        console.log("Error");
                    }
                });
            }
        })
    })
};
//res.send(product);
	// var query = "select product.name, product.description, product.price, product.product_id, product.quantity ,user.id, user.fname, product.forBid from product join user where product.seller_id = user.id and user.id<>'"+req.session.userid+"'";
	// sqldb.fetchData(function(err,results){
	// 	if(err){
	// 		//logger.log('error',"Query: " +query);
	// 		console.log("In error");
	// 		throw err;
	// 	}
	// 	else {
	// 			console.log("sending products from node");
	// 			res.send(results);
	// 			//res.render('homepage');
	// 		        }
    //
	// 		    },query);



exports.getMyAds = function(req,res){

	mongo.connect(mongoURL, function () {
		console.log('Connected to mongo at: ' + mongoURL);
		var product = mongo.collection('product');

		product.find({seller_email:req.session.email}).toArray(function(err, product){
			if(product) {
				console.log("Getting your ads");
                console.log(product);
				res.send(product);
			}
			else{
				console.log("Error");
			}
		})

	});

	// var query = "select * from product where seller_id = '"+req.session.userid+"'";
	// sqldb.fetchData(function(err,results){
	// 	if(err){
	// 		logger.log('error',"Query: " +query);
	// 		console.log("In error");
	// 		throw err;
	// 	}
	// 	else {
	// 			console.log("sending myAds from node");
	// 			res.send(results);
	// 			//res.render('homepage');
	// 		        }
    //
	// 		    },query);

}

exports.myAds = function(req, res){
	//logger.log('info', "User with userid "+req.session.userid+" checking the ads they posted");
	console.log("in homepage");
	res.render('myAds');
	}

exports.homepage = function(req, res){
	console.log("in homepage");
	//logger.log('info', "User with userid "+req.session.userid+" at homepage");
	res.render('homepage');
	}