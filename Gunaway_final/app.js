
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var passport = require('passport');
require('./routes/passport')(passport);

var mongoSessionURL = "mongodb://localhost:27017/user";
var app = express();
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var session = require('client-sessions');
var sign = require("./routes/signin");
var profile = require("./routes/profile");
var sell = require("./routes/sell");
var logout = require("./routes/logout");
var getproduct = require("./routes/getproduct");
var logininfo = require("./routes/logininfo");
var productdetail = require("./routes/productdetail");
var cart = require("./routes/getcart");
var addcart = require("./routes/addcart");
var endit = require("./routes/payment");
var history = require("./routes/history");
var bid = require("./routes/bid");
var gunaway = require("./routes/gunaway");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: "CMPE273_passport",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(app.router);
app.use(passport.initialize());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//get methods
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/signin', sign.signin);
app.get('/register1', sign.register1);
app.get('/homepage', getproduct.homepage);
app.get('/profile', profile.getprofilepage);
app.get('/sell',sell.sell);
app.get('/logout',logout.logout);
app.get('/myAds', getproduct.myAds);
app.get('/logininfo', logininfo.getlogininfo);
app.get('/productdetail', productdetail.productdetail);
app.get('/cart', cart.cart);
app.get('/payment', cart.payment);
app.get('/bought', history.mybought);
app.get('/sold', history.mysold);
app.get('/productbid', productdetail.productbid);
app.get('/gunaway', gunaway.gunaway);

//post methods
app.post('/reg',sign.reg);
app.post('/check',sign.check);
app.post('/sellitem',sell.sellitem);
app.post('/getproduct', getproduct.getproduct);
app.post('/reg1', sign.reg1);
app.post('/getMyAds', getproduct.getMyAds);
//app.post('/emailnotreg', sign.emailnotreg);
//app.post('/emailreg', sign.emailreg);
app.post('/check_handle', sign.check_handle);
app.post('/profile', profile.profile);
app.post('/logininfo', logininfo.logininfo);
app.post('/addcart', addcart.addcart);
app.post('/getcart', cart.getcart);
app.post('/removeitem', cart.removeitem);
app.post('/checkout', cart.checkout);
app.post('/ended',endit.ended);
app.post('/getbought', history.getbought);
app.post('/getsold',history.getsold);
app.post('/postbid',sell.postbid);
app.post('/placebid', bid.placebid);
app.post('/gunawaycheck', gunaway.gunawaycheck);


//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionURL, function() {
    console.log('Connected to mongo at: ' + mongoSessionURL);
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});