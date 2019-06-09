//https://www.npmjs.com/package/lru-cache-node

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var Cache = require("lru-cache-node")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// // Sets up the Express app to handle data parsing
app.use(bodyParser.json({type: 'application/json'}));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// //Set up cache
let cache = new Cache(3);
//let cache = new Cache(3000);

cache.set('a', '7');
cache.set('b', '5');
cache.set('c', '3');
console.log(cache)

function determineKeyFromLatLongInputs(latitude, longitude){
    
    //I am hard-coding this to get key for purposes of this homework
    var key;

    if (latitude === -90 && longitude === -180){
        key = 'a'
    } else if (latitude === 90 && longitude === 180){
        key = 'b'
    } else if (latitude === 45 && longitude === 90){
        key = 'c'
    }
    
    //return key
    getImageURL(key)
}


function getImageURL(key){
    
    //1) Cache hit- Return a cached URL
    //Is key in cache?
    cache.contains(key)

    if (cache.contains(key) === true){
        cache.get(key)        
    } else if(cache.contains(key) === false){
        //If there is no item in the cache for the key, there would be a function here to fetch
        //a URL from a database or scrape web for the lat/long input
        //I am going to hard code a new URL value to add to cache here for the purposes of the project
        cache.set('e', '15')

        //For testing, I used a cache size of three
        //By adding another value to the cache, we see that 'e' is added and the oldest item is ejected
        //Which is 'a' in this case
        console.log(cache.toArray());

        //The new cache is:
        // [   { key: 'e', value: '15' },
        //     { key: 'c', value: '3' },
        //     { key: 'b', value: '5' } 
        // ]
    }
}

//PATHS
//Home Path - This is mainly for testing purposes at the moment
app.get('/', function(req, res, next) {
    //toArray(): returns the cache in array form
    var imagesCache = cache.toArray()
    
    //I can see all the items in the cache printed to my root local host
    res.send(imagesCache) 
});


//Long/Lat Path
app.get("/api/mars/:latitude/:longitude", (req, res) => {

    //These are the parameters and they need to be numbers
    var latitude = parseInt(req.params.latitude);
    var longitude = parseInt(req.params.longitude);

    if(latitude > 90 || longitude > 180){
        res.send("latitude or longitude is ABOVE accepted range: \n latitude max: 90 \n longitude max: 180")
        console.log("latitude or longitude is ABOVE accepted range: \n latitude max: 90 \n longitude max: 180")
    } else if (latitude < -90 || longitude < -180){
        res.send("latitude or longitude is BELOW accepted range:\nlatitude min: 90 \n longitude min: 180")
        console.log("latitude or longitude is BELOW accepted range:\nlatitude min: 90 \n longitude min: 180")
    } else if (isNaN(latitude) || isNaN(longitude)){
        res.send("latitude or longitude is not a number. \n input must be number value")
        console.log("latitude or longitude is not a number. \n input must be number value")
    } else{
        determineKeyFromLatLongInputs(latitude, longitude)
    }   
})

// Static directory
app.use('/', express.static("public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  

 