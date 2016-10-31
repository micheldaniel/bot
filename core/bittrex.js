//load modules
var bittrex = require('node.bittrex.api');
var fs = require('fs');
var request = require('request');

//laat codes
var colorCodes = require('../scripts/colors.js');

//keys
var keys = JSON.parse(fs.readFileSync("./keys.json", "utf8"));
var bittrexApiKey = keys.bittrex.apiKey;
var bittrexSercetApi = keys.bittrex.apiSecret;


//bittrex
bittrex.options({
    'apikey' : bittrexApiKey,
    'apisecret' : bittrexSercetApi, 
    'stream' : true,
    'verbose' : false,
    'cleartext' : false 
});

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
        console.log(colorCodes.log()+"Alle bittrex markt data is opgehaald.");
    }
}

//requet balance
function requestBalance(){
    bittrex.getbalances( function( data ) {
        var memoryBalanceDb = [];
        
        for (i=0; i < data.length; i++){
            
            memoryBalanceDb.push({
               tag: data[i].Currency,
               data: {
                    Balance: data.result[i].Balance,
                    Available: data.result[i].Available,
                    Pending: data.result[i].Pending
               }
            });
        }
        
        fs.writeFile('./marktdata/temp/BalanceData.json', memoryBalanceDb, function(err){
            if(err){
                console.log(colorCodes.error()+"Kan bittrex balance niet opslaan.");
            } else {
                console.log(colorCodes.log()+"Alle bittrex balance data is opgeslagen.");
            }
        });
    });
}

//request
exports.alleBittrex = function(){
    request(options, callback);
    requestBalance();
};
//fs.existsSync('/etc/file')