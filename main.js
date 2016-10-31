//load modules
var express = require('express');
var fs = require('fs');

//app
var app = express();

//laat config.json
var config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

//laat andere codes
var colorCodes = require('./scripts/colors.js');
var Allebittrex = require('./core/bittrex.js');
var Allepoloniex = require('./core/poloniex.js');
var DataVerwerker = require('./core/dataverwerker.js');

//code programma aansturen
function reload(){
    
    //kijk of bittrex gestart mag worden
    if (true == config.beschikbaar.marktdata.bittrex){
        Allebittrex.alleBittrex();
    } else {
        console.log(colorCodes.warn()+"Bittrex mag niet van config.json worden opgestart!");
    }

    //kijk of poloniex gestart mag worden
    if (true == config.beschikbaar.marktdata.poloniex){
        Allepoloniex.allePoloniex();
    } else {
        console.log(colorCodes.warn()+"Poloniex mag niet van config.json worden opgestart!");
    }  
    
    //kjk of dataverwerker gestart mag worden
    if (true == config.beschikbaar.dataverwerker){
        DataVerwerker.dataVerwerker();
    } else {
        console.log(colorCodes.warn()+"Dataverwerker mag niet van config.json worden opgestart!");
    }  
};

//start programma
reload();

//set reload tijd
setInterval(function(){
    reload()
}, 60000);

//DataVerwerker.dataVerwerker();

//server
app.listen(config.poort, function(){
   console.log(colorCodes.log()+"Server is opgestart");
});
