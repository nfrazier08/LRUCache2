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

cache.set('a', 7);
cache.set('b', 5);
cache.set('c', 3);


//Functions
function getImageURL(){
    console.log("yep I can get here!")

    //Inside this function, I need to handle the following:
    //If the user enters an accepted lon/lat value (Returm random number in string form :
       //1) Cache hit- Return a cached URL
       //2) Cache miss
            //app gets a new URL and adds it to cache
            //if cache is full, eject oldest item
    
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
app.get("/api/mars/:latitude/:longitude", (req, res, next) => {
   
    //These are the parameters and they need to be numbers
    var latitude = parseInt(req.params.latitude);
    var longitude = parseInt(req.params.longitude);

    //Latitude Range
    //-90 to 90

    //Longitude Range
    //-180 to 180
    
    if(latitude > 90 || longitude > 180){
        res.send("latitude or longitude is ABOVE accepted range: \n latitude max: 90 \n longitude max: 180")
    } else if (latitude < -90 || longitude < -180){
        res.send("latitude or longitude is BELOW accepted range:\nlatitude min: 90 \n longitude min: 180")
    } else if (isNaN(latitude) || isNaN(longitude)){
        res.send("latitude or longitude is not a number \n input must be number value")
    } else{
        getImageURL(latitude, longitude)
    }

   
})

// Static directory
app.use('/', express.static("public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  

 