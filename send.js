
var amqp = require('amqplib/callback_api');
require('es6-promise').polyfill(); // aktiviert Promises // wenn man auf url zugreift, weiß code nicht wie lange es dauert, zeile und zeile werden ausgeführt obwohl ergebnis deer anfrage noch nich da ist, lässt den code auf ereignis warten
var fetchES6 = require('isomorphic-fetch'); // aktiviert fetch
var async = require('async');
var geolocation = require('geolocation')


amqp.connect('amqp://localhost', function(err, conn) {
  
  conn.createChannel(function(err, ch) {
    
    
   function getWetter() {
    
    
    var appKey = "7d987f8a7dc71e57baae316cb96771ed"; 
    var city = "London";
      
    
    return new Promise(resolve => {
        let wetterapi = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+appKey);  
        resolve(wetterapi); 
      }); 
      
        
    };
    
    
   function getInsta() {

        // instagram token
        var token = '39190828.ce76c6a.bc3ded7dde964452a106441e10420116';
        var count = 1; 
          
        
        return new Promise(resolve => { 
            let instaApi = fetch('https://api.instagram.com/v1/users/self/media/recent?access_token=' + token + '&count=' + count);  
            resolve(instaApi); 
          }); 
          
            
        };
    
    
    
    
//    
//    getDaten().then(function(result) {
//      
//      console.log(result);
//      
//      
//      });
      
        
async function DatenFertig () {
        
      var resultWetter = await getWetter();
      var resultInsta = await getInsta(); 
      resultWetter = await resultWetter.json(); 
      resultInsta = await resultInsta.json();
      
      console.log(resultWetter.main.temp);
      console.log(resultInsta.data);
        
      }
      
    
var ergebnis = DatenFertig();
       
    
    var q = 'hello';
    var msg = ergebnis.toString();

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
