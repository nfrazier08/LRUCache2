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
   //, otherCache = new LRU(50) // sets just the max size


//cache.set("key", "value")
//cache.get("key") // "value"

//probably want "some object to be mars image object"
// var someObject = { a: 1 }
// cache.set(someObject, 'a value')
// Object keys are not toString()-ed
// cache.set('[object Object]', 'a different value')
// assert.equal(cache.get(someObject), 'a value')
// A similar object with same keys/values won't work,
// because it's a different object identity
// assert.equal(cache.get({ a: 1 }), undefined)

// cache.reset() 





// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Paths

//Home path
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Long/Lat Path
app.get("/api/mars/:latitude/:longitude", function(req, res) {
    //These are the parameters and they need to be numbers
    var latitude = parseInt(req.params.latitude);
    var longitude = parseInt(req.params.longitude);

    //error handling
    //Latitude -90 to 90
    if(latitude > 90){
        //lat is accepted accepted range
    } else if (latitude < -90){
        //lat is below accepted range
    } else if (isNaN(latitude)){
        //Input is not an integer
    } else{
        //entered lat is accepted
    }

    //Long -180 to 180
    if(longitude > 180){
        //long is above accepted range
    } else if (longitude < -180){
        //long is below accepted range
    } else if (isNaN(longitude)){
        //Long input is not an integer
    } else{
        //entered long was accepted
    }

    //begin calling in image from LRU cache


    //function

    















})

// Static directory
app.use('/', express.static("public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  