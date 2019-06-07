// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Paths
app.get("/api/:latitude/:longitude", function(req, res) {
    var latitude = req.params.latitude;
    var longitude = req.params.longitude;

    console.log(latitude)
    console.log(longitude)
})

// Static directory
app.use(express.static("public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  