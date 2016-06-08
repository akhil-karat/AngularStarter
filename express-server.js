var express = require('express'),
	openUrl = require("openurl");
var app = express();
app.use(express.static('./WebContent'));
app.listen(3000);
console.log('started node server at 3001');
openUrl.open('http://localhost:3000');