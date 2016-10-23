//load modules
var fs = require('fs');
var request = require('request');

//laat codes
var colorCodes = require('../scripts/colors.js');

//laat key worldcoinindexkey
var key = JSON.parse(fs.readFileSync('./config.json')).worldcoinindexkey;

//option
var options = {
    url: 'https://www.worldcoinindex.com/apiservice/json?key='+ key,
    headers: {
      'User-Agent': 'request'
    }
  };

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        
        if(body == "NOT OK!"){
            console.warn(colorCodes.warn()+"Kan geen coins update lijst ophalen van worldcoinindex.com omdat de key fout is.");
        } else {
            console.log("lol");
            //coin memoryDB
            var memoryDB = [];
            var data = JSON.parse(body).Markets;
            for(i=0; i < data.length; i++){

                //label
                var rawLabel = data[i].Label;
                console.log(rawLabel);

                var getLength = rawLabel.length - 4;
                var coinTag = rawLabel.substring(0,getLength);
                
                //push tag
                memoryDB.push(coinTag);
            }
            
            fs.writeFile('./marktdata/allCoinsTags.json', memoryDB, function(err){
                if (err){
                    console.log(colorCodes.error()+"Bij worldcoinindex kan de memoryDB niet opslaan.!");
                }else{
                    console.log(colorCodes.info()+ "Cointag db is opgeslagen.");
                }
                
            });
        }
    }
}
request(options, callback);
//request
exports.worldCoinIndex = function(){
    request(options, callback);
    console.log(colorCodes.log()+"Alle worldcoinindex coins zijn opgehaald.");
};