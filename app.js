var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  http = require('http'),
  path = require('path');

// module.exports is what other files get if they require() this...so all of 'app' is exposed
var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// // development only
// if (env === 'development') {
//   app.use(errorHandler());
// }

// var prod = false;
// if (env === 'production') {
//   prod = true;
// }

// app.use(function(req, res, next) {
//   req.in_production = prod;
//   next();
// });

/**
* Routes
**/


/**
* Bare domain, render index.html
* Render the partials received from $routeProvider
* Any other domain render 404.html
 */
app.get('/', function(req, res) {
	res.render('index');
});
// app.get('/partials/:name', routes.partials);
// app.use(routes.error);



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function (req, resp) {
  console.log('Express server listening on port ' + app.get('port'));
});