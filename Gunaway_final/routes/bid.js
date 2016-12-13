/**
 * Created by vedantshete on 10/25/16.
 */
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

exports.placebid = function(req, res){
    var product_id = req.param("product_id");
    var id = new ObjectId(product_id);
    var bid = req.param("bid");
    console.log(product_id+" "+bid);

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');

        product.update({"_id":id},
        {
            $set:
            {
                "price":bid,
                "buyer_email":req.session.email
            }
        },{ upsert: true },
            function(err, result){
                if(result){
                    console.log("Your bid has been placed");
                    res.render('homepage');
                }else{
                    console.log("Error occurred while placing bid");
                }

            }

    )

    });
    // var query = "Insert into bid(product_id, bidder_id, bid) values ('"+product_id+"', '"+req.session.userid+"', '"+bid+"')";
    // sqldb.fetchData(function(err,results){
    //     if(err){
    //         logger.log('error',"Query: " +query);
    //         console.log("In error");
    //         throw err;
    //     }
    //     else{
    //         console.log("Now trying to update price in product table"+bid+" "+product_id);
    //         var updateproductprice="Update product set price='"+bid+"' where product_id='"+product_id+"'";
    //         sqldb.storeData(function(err,results1) {
    //             if (err) {
    //
    //                 console.log("In error");
    //                 throw err;
    //             }
    //             else {
    //                 console.log("Base price updated in product table");
    //
    //             }
    //         },updateproductprice);
    //         console.log("bid inserted in bid table");
    //         res.render('homepage');
    //     }
    // },query);
};
