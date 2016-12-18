/**
 * Created by vedant on 11/24/16.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/user";


exports.gunawaycheck=function(req,res) {
    var gunallowed = false;
    var buyer_email=req.session.email;
     var q1=req.param("q1");
     var q2=req.param("q2");
     var q3=req.param("q3");
     var q4=req.param("q4");
     var q5=req.param("q5");
     var q6=req.param("q6");
     var q7=req.param("q7");
     var q8=req.param("q8");
     var q9=req.param("q9");
     var q10=req.param("q10");
     var q11=req.param("q11");
     var q12=req.param("q12");
     var q13=req.param("q13");
     var q14=req.param("q14");
     var q15=req.param("q15");
     var q16=req.param("q16");
     var q17=req.param("q17");
     var q18=req.param("q18");
     var q19=req.param("q19");
     var productName=req.session.productName;
     var productId=req.session.productId;
     var productQuantity=req.session.productQuantity;
     var productPrice=req.session.productPrice;
     var productQuantityInCart=req.session.productQuantityInCart;
     var productSeller=req.session.productSeller;
     var productTotal=req.session.productTotal;

     console.log("-------------Call came here========");


    var temp_q1=parseInt(q1,10);
    var temp_q2=parseInt(q2,10);
    var temp_q3=parseInt(q3,10);
    var temp_q4=parseInt(q4,10);
    var temp_q5=parseInt(q5,10);
    var temp_q6=parseInt(q6,10);
    var temp_q7=parseInt(q7,10);
    var temp_q8=parseInt(q8,10);
    var temp_q9=parseInt(q9,10);
    var temp_q10=parseInt(q10,10);
    var temp_q11=parseInt(q11,10);
    var temp_q12=parseInt(q12,10);
    var temp_q13=parseInt(q13,10);
    var temp_q14=parseInt(q14,10);
    var temp_q15=parseInt(q15,10);
    var temp_q16=parseInt(q16,10);
    var temp_q17=parseInt(q17,10);
    var temp_q18=parseInt(q18,10);
    var temp_q19=parseInt(q19,10);

    var total_score=(temp_q1+temp_q2+temp_q3+temp_q4+temp_q5+temp_q6+temp_q7+temp_q8+temp_q9+temp_q10+temp_q11+temp_q12+temp_q13+temp_q14+temp_q15+temp_q16+temp_q17+temp_q18+temp_q19)/10;

    console.log(total_score+"The value of the total is");


   // var total_score=4*((temp_q1+temp_q2+temp_q3+temp_q4+temp_q5+temp_q6+temp_q7+temp_q8+temp_q9+temp_q10+temp_q11+temp_q12+temp_q13+temp_q14+temp_q15)/10)+(10*((temp_q16+temp_q17+temp_q18+temp_q19)/10));
    console.log(total_score,"I am here");

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var product = mongo.collection('product');
        var gunaway = mongo.collection('gunaway');
        var user = mongo.collection('user');
        var cart = mongo.collection('cart');
//Write the condition for false here
        if(total_score<=40)
        {
            gunallowed = true;
        }
        else if(total_score>40){
            gunallowed = false;
        }



        if(gunallowed) {
            //if user is allowed to buy a gun then, making entry in gunaway table and adding the product to users cart
            gunaway.insert({
                "buyer_email": buyer_email,
                "q1": temp_q1,
                "q2": temp_q2,
                "q3": temp_q3,
                "q4": temp_q4,
                "q5": temp_q5,
                "q6": temp_q6,
                "q7": temp_q7,
                "q8": temp_q8,
                "q9": temp_q9,
                "q10": temp_q10,
                "q11": temp_q11,
                "q12": temp_q12,
                "q13": temp_q13,
                "q14": temp_q14,
                "q15": temp_q15,
                "q16": temp_q16,
                "q17": temp_q17,
                "q18": temp_q18,
                "q19": temp_q19,
                "gunallowed": true
            }, function (err, result) {
                if (result) {
                    console.log("Questionnaire submitted");

                    cart.insert({
                        "_id": productId,
                        "name": productName,
                        "price": productPrice,
                        "quantityincart": productQuantityInCart,
                        "total": productTotal,
                        "quantity": productQuantity,
                        "buyer_email": buyer_email
                    });
console.log("Entry made in cart");
                    result = {"statusCode":200};
                    res.send(result);
                } else {
                    console.log("Error");
                    //callback(null, res);
                }
            });
        }

        else{
//if user is not allowed to buy a gun then, making an entry in gunaway table and updating users 'canbuygun' to false(0) in user table
            gunaway.insert({
                "buyer_email": buyer_email,
                "q1": temp_q1,
                "q2": temp_q2,
                "q3": temp_q3,
                "q4": temp_q4,
                "q5": temp_q5,
                "q6": temp_q6,
                "q7": temp_q7,
                "q8": temp_q8,
                "q9": temp_q9,
                "q10": temp_q10,
                "q11": temp_q11,
                "q12": temp_q12,
                "q13": temp_q13,
                "q14": temp_q14,
                "q15": temp_q15,
                "q16": temp_q16,
                "q17": temp_q17,
                "q18": temp_q18,
                "q19": temp_q19,
                "gunallowed": false
            }, function (err, result) {
                if (result) {
                    console.log("Questionnaire submitted");
                    user.update(
                        {"email": buyer_email},
                        {
                            $set: {
                                canbuygun: "0"
                            }
                        });
                    console.log("User blocked from buying gun");
                    result = {"statusCode":202};
                    res.send(result);
                } else {
                    console.log("Error");

                }
            });

        }
    })
};

exports.gunaway = function(req, res){
    res.render('gunaway');
};