var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');
var mongo = require("./mongo");
var ObjectId = require('mongodb').ObjectId;
var mongoURL = "mongodb://localhost:27017/user";

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.ended=function(req,res){
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var cart = mongo.collection('cart');
        var user = mongo.collection('user');
        var product = mongo.collection('product');

        cart.find({buyer_email:req.session.email}).toArray(function(err, results){

		if(err){
			console.log("In error");
			throw err;
		}
		else {

		    console.log("No of products in cart "+results.length);
			for(i=0;i<results.length;i++){
                var id = new ObjectId(results[i]._id);
                console.log(id);
                console.log(results[i]._id);
                product.update({_id: id},
                    {
                        $set: {
                            "buyer_email": req.session.email
                            //"total": getcartitems[i].total
                        }
                    });
                    console.log(results[i].quantity - results[i].quantityincart);
                product.update({_id: id},
                    {
                        $set: {
                            "quantity": results[i].quantity - results[i].quantityincart
                            //"total": getcartitems[i].total
                        }
                    });
                cart.deleteMany({ buyer_email : req.session.email });

}
            res.render('homepage');
}
        });

});
}