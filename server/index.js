var browserify = require('browserify-middleware')
var express = require('express')
var app = express()
var Path = require('path')
var MongoClient = require('mongodb').MongoClient
var config = require('./config.js').development;
var assert = require('assert')
var url = process.env.MONGOLAB_URI || config.database || 'mongodb://localhost:27017/trebekardy'
var a;

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Correctly connects to the database');
    a = db.collection('trebekardy');
  }
})

app.get('/js/app-bundle.js',
  browserify('./client/app-bundle/index.js'))

var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))

// Question endpoint
app.get('/answer', function(req, res) {
  var count, rand, data;

  a.findOne({"value": "$200"}, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      console.log(data)
      res.json(data)
    }
  });
});

app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' )
})

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
