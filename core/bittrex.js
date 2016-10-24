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
        
        //memoryDB
        var memoryDB = [];
        
        //json.parse
        var data = JSON.parse(body).result;
        for (i=0; i < data.length; i++){
            memoryDB.push({
                tag: data[i].MarketName,
                data: {
                    bid: data[i].Bid,
                    ask: data[i].Ask
                }
            });
        }
        
        fs.writeFile("./marktdata/temp/bittrexAllData.json", JSON.stringify(memoryDB));
    }
}

//request
exports.alleBittrex = function(){
    request(options, callback);
    console.log(colorCodes.log()+"Alle bittrex data opgehaald.");
};
//fs.existsSync('/etc/file')