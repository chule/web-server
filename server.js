var express = require("express");

var app = express();
var port = 3000;

var midleware = {
	requireAuthentication: function (req, res, next) {
		console.log("Private route hit!");
		next();
	},
	logger: function (req, res, next) {
		var date = new Date();
		console.log("Request: " + req.method + " " + req.originalUrl + " " + date.toString());
		next();
	}
};

app.use(midleware.logger);

app.get("/about", midleware.requireAuthentication, function (req, res) {
	res.send("About Hello Express!");
});

app.use(express.static(__dirname + "/public"));

app.listen(port, function () {
	console.log("Express server started @ port " + port + "!");
});