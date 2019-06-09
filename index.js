//https://www.npmjs.com/package/lru-cache-node

// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Cache = require("lru-cache-node")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set up cache
let cache = new Cache(3);

cache.set('a', 7);
cache.set('b', 5);
cache.set('c', 3);
console.log(cache);
console.log("setting 10");
cache.set('d', 10);
console.log("cache");
console.log(cache);


//PATHS


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
  