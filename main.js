//load modules
var express = require('express');

//app
var app = express();

//load andere codes
var colorCodes = require('./scripts/colors.js');
var allebittrex = require('./core/bittrex.js');
var allepoloniex = require('./core/poloniex.js');


allebittrex.alleBittrex();
allepoloniex.allePoloniex();



//server
app.listen(8080, function(){
   console.log(colorCodes.log()+"Server is opgestart");
});
