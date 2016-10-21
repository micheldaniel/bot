//load modules
var fs = require('fs');
//load modules
var request = require('request');

//laat codes
var colorCodes = require('../scripts/colors.js');

    //option
var options = {
    url: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
    headers: {
      'User-Agent': 'request'
    }
  };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        fs.writeFile("./marktdata/temp/bittrexAllData.json", body);
    }
}

//request
exports.alleBittrex = function(){
    request(options, callback);
    console.log(colorCodes.log()+"Alle bittrex data opgehaald.");
};


//fs.existsSync('/etc/file')
/*
 *         //for loop
        for (i = 0; i < data.length; i++) { 

            //loop
            if(data[i].MarketName == "BITCNY-BTC"){

            } else {

            }
        }
 */