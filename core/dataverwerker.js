//load modules
var fs = require('fs-extra');
var async = require('async');

//laat codes
var colorCodes = require('../scripts/colors.js');

//laat markt data
var alleCoinsTag = JSON.parse(fs.readFileSync("./marktdata/allCoinsTags.json"));
var alleBittrexData = JSON.parse(fs.readFileSync("./marktdata/temp/bittrexAllData.json"));
var allePoloniexData = JSON.parse(fs.readFileSync("./marktdata/poloniexAllData.json"));

//alle memory db
var memoryDB = [];

function startDataverwerker (){
    async.parallel([
        
        //bittrex
        function() {
            for(i = 0; i < alleBittrexData.length; i++){

                //bittrex
                var data = JSON.stringify({
                    ask: alleBittrexData[i].data.ask,
                    bid: alleBittrexData[i].data.bid
                });
                fs.writeFile('./marktdata/temp/'+alleBittrexData[i].tag+'.json', data);
            }
            console.log(colorCodes.log()+"Alle bittrex data is verwerkt.");
        },
        
        //markt data
        function (){
            //alle coins afgaan
            for (i = 0; i < alleCoinsTag.length; i++) {
                function bittrex (){

                    //kijk of file bestaat
                    if(fs.existsSync('./marktdata/temp/BTC-'+alleCoinsTag[i].tag+'.json')){
                        var bittrexData = fs.readFileSync('./marktdata/temp/BTC-'+alleCoinsTag[i].tag+'.json');
                        var bittrexCollect = {
                            naam: alleCoinsTag[i].tag,
                            bid: bittrexData.bid,
                            ask: bittrexData.ask
                        };
                        //console.log(bittrexCollect)
                        fs.removeSync('./marktdata/temp/BTC-'+alleCoinsTag[i].tag+'.json', function (err) {
                            if (!err) {
                                console.warn(colorCodes.warn()+'Software kan ./marktdata/temp/BTC-'+alleCoinsTag[i].tag+'.json+" niet legen.');
                            } else {
                                console.log(colorCodes.log()+'Map ./marktdata/temp/BTC-'+alleCoinsTag[i].tag+'.json is leeg gemaakt.');
                            }
                        });                     
                        
                        return bittrexCollect;
                    } else {
                        return "null";
                        console.log("null");
                    }
                };

                function poloniex(){

                    //kijk of de market ook bij poloniex is
                    var coinTag = alleCoinsTag[i].tag;

                    //BTC STRING
                    var cointagPoloniex = "BTC_"+ coinTag;

                    switch(allePoloniexData[cointagPoloniex]) {

                        case undefined:
                            return "null";
                            break;

                        default:
                            //poloniex collect
                            var poloniex_collect = {
                                naam: coinTag,
                                bid: allePoloniexData[cointagPoloniex].highestBid,
                                ask: allePoloniexData[cointagPoloniex].highestAsk
                            };

                            //return data
                            return poloniex_collect;
                            break;
                    }
                }

                //data
                var allData = {
                    bittrex: bittrex(),
                    poloniex: poloniex()
                };

                if(allData.bittrex == "null" && allData.poloniex == "null") {

                } else {
                    //memorydb
                    memoryDB.push(allData);
                }

            }
            fs.writeFile("./marktdata/allCoins.json", JSON.stringify(memoryDB));
        }
    ], function (err, result) {
        // result now equals 'done'
    });
};
exports.dataVerwerker = function(){
    startDataverwerker();
    console.log(colorCodes.log()+"Alle markt data is verwerkt.");
};