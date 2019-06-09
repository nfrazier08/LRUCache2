// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//LRU Cache NPM
var LRU = require("lru-cache")
    , options = { max: 2 //maximum size of the cache; length of all values in the cache
    , length: function (n, key) { return n * 2 + key.length } //lenth is a function that is used to calculate length of stored items
              , dispose: function (key, n) { n.close() } //A function called when items are dropped from the cache; clean up tasks when items are no longer available;called before items are actually removed
              , maxAge: 1000 * 60 * 60 
              , stale: true 
              , updateAgeOnGet: true } //When using time-expiring entries with maxAge, setting this to true will make each item's effective time update to the current time whenever it is retrieved from cache, causing it to not expire. (It can still fall out of cache based on recency of use, of course.)
   , cache = new LRU(options)   
   console.log(cache.length, "cache length")

   var marsImagesObject = {}

   //Set test items for the cache
   cache.set(marsImagesObject, "image 1")
   cache.set(marsImagesObject, "image 2")
   cache.set(marsImagesObject, "image 3")

   //What is the cache length now?
   //This returns NaN
   console.log(cache, "now?")
    
   //This does return image 1/image 2 when I was setting the cache as
    //    cache.set(-90, "image 3")
    //    console.log(cache.get(-90))
    //    console.log(cache.get(-45))



// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Paths

//Home path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Get all images from cache
app.get("/all", (req, res)  => {
    res.json(cache.get(1));
  });

//Long/Lat Path
app.get("/api/mars/:latitude/:longitude", (req, res) => {
    //These are the parameters and they need to be numbers
    var latitude = parseInt(req.params.latitude);
    var longitude = parseInt(req.params.longitude);
    error = {}

    //error handling
    //Latitude -90 to 90
    if(latitude > 90){
        error.latitude = 'lat is above accepted range'
    } else if (latitude < -90){
        //lat is below accepted range
    } else if (isNaN(latitude)){
        //Input is not an integer
    } else{
        //entered lat is accepted
    }

    //Long -180 to 180
    if(longitude > 180){
        error.longitude = 'lat is above accepted range'
    } else if (longitude < -180){
        //long is below accepted ranges
    } else if (isNaN(longitude)){
        //Long input is not an integer
    } else{
        //entered long was accepted
    }

    //begin calling in image from LRU cache
    //I would like a json object


    //function

    















})

// Static directory
app.use('/', express.static("public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  