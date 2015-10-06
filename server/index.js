var browserify = require('browserify-middleware')
var express = require('express')
var app = express()
var Path = require('path')
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var url = 'mongodb://localhost:27017/trebekardy'
// var url = process.env.MONGOLAB_URI || config.mongodb
var DB, questions;

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Correctly connects to the database');
    DB = db;
    questions = DB.collection('questions');
  }
})

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app-bundle/index.js'))

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))

app.get('/question', function(req, res) {

	// var count = questions.count()
	// var rand = function(){return Math.floor( Math.random() * count )}

  var data = questions.find()

  console.log(count)
  res.send(questions.find())
});

//
// Support browser history pushstate.
// NOTE: Make sure this route is always last.
//
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
