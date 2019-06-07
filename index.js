// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
//Will need to call in LRU Cache NPM

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
    //Long -180 to 180
    if(latitude)


    















})

// Static directory
app.use('/', express.static("public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  