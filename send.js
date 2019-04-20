
var amqp = require('amqplib/callback_api');
require('es6-promise').polyfill(); // aktiviert Promises // wenn man auf url zugreift, weiß code nicht wie lange es dauert, zeile und zeile werden ausgeführt obwohl ergebnis deer anfrage noch nich da ist, lässt den code auf ereignis warten
var fetchES6 = require('isomorphic-fetch'); // aktiviert fetch
var async = require('async');
var geolocation = require('geolocation')


amqp.connect('amqp://localhost', function(err, conn) {
  
  conn.createChannel(function(err, ch) {
    
    
    var appKey = "7d987f8a7dc71e57baae316cb96771ed"; 
    var city = "London";
    
    
    function getDaten() {
      
      return new Promise(resolve => {
        let wetterapi = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+appKey);  
        resolve(wetterapi); 
      }); 
      
        
    };
    
//    
//    getDaten().then(function(result) {
//      
//      console.log(result);
//      
//      
//      });
      
        
async function wetterFertig () {
        
      var result = await getDaten(); 
      result = await result.json();
      
      console.log(result.main.temp);
        
      }
    
    var ergebnis = wetterFertig();
       
    
    var q = 'hello';
    var msg = ergebnis.toString();

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
