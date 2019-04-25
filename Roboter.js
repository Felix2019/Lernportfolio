
var amqp = require('amqplib/callback_api');
require('es6-promise').polyfill(); // aktiviert Promises // wenn man auf url zugreift, weiß code nicht wie lange es dauert, zeile und zeile werden ausgeführt obwohl ergebnis deer anfrage noch nich da ist, lässt den code auf ereignis warten
var fetchES6 = require('isomorphic-fetch'); // aktiviert fetch
var async = require('async');
var geolocation = require('geolocation')
const https = require('https');
var fs = require('fs');
var geolib = require('geolib');
var http = require('http');




    var roboter = new Object();
	roboter.name = "Roboter1"
	roboter.messung = "temperatur"; 
	
	
	var bewegung; 
	var latitude; 
	var longitude; 
	var poslat = 35.4356; 
	var poslong = 23.7648;
	var akku = 100; 
	
	
	
	function akkuZustand() {
		
		
		akku = akku - 10; 
		console.log(akku);
		
	}
	
	
	
	function entferungStation() {
		
		const CordinatesStation = {latitude: 51.5103, longitude: 7.49347}; 
		
		var result = geolib.getDistance(
			CordinatesStation,
			{latitude: poslat, longitude: poslong}
		);
		
		// console.log(result); // so weit ist Roboter momentan entfernt
	
	}
	

	
 entferungStation(); 
	     
	
	
	function bewegeDich(latitude1,longitude1,speed) {
		
	
        poslat= poslat + latitude1; 
		poslong = poslong + longitude1; 
		//console.log(poslat, poslong);
		
		const aktuellPos = {latitude: poslat, longitude: poslong}; 
		
		var resultDistance = geolib.getDistance(
			aktuellPos, 
			{latitude: latitude1, longitude: longitude1}
		);
		
		
		var distance = resultDistance/ speed; 
		
		console.log(distance); 
		
	    if (distance > 50000) { 
		
		     akkuZustand();
		
		}
		
	}
	
	
	  bewegung = bewegeDich(2,2, 20);  
	

	
function getDaten() {
			
			
			var appKey = "7d987f8a7dc71e57baae316cb96771ed"; 
			var city = "London";
				
			
			return new Promise(resolve => {
					let wetterapi = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+appKey);  
					resolve(wetterapi);
	 
				}); 
				
					
			};
			
			
 async function probeNehmen () {
	
	
	var result = await getDaten(); 
	result = await result.json(); 
	
	console.log(result.main.pressure); 
	
	if (result.main.pressure > 500) { 
		
		console.log("Gefahr LOLL L")
		
	}
	

								
	
}
				   
	
	
//probeNehmen();
	
	 
	
	
	
	
	
	
	
	


