//load modules
var fs = require('fs');
var request = require('request');

//laat codes
var colorCodes = require('../scripts/colors.js');

    //option
var options = {
    url: 'https://poloniex.com/public?command=returnTicker',
    headers: {
      'User-Agent': 'request'
    }
  };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        
        //
        var person = JSON.parse(body);
        //console.log(data);
        var address = "BTC_ARDR"
        console.log(person["BTC_1CR"])
    }
}


request(options, callback);
//request
exports.allePoloniex = function(){
    request(options, callback);
    console.log(colorCodes.log()+"Alle poloniex data opgehaald.");
};




