// sets up server requirements
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

//require database
var userdb = require('./DB/userdb.js');
var favoritesdb = require('./DB/favoritesdb.js');

//creates server
var app = express();

//creates default port
var port = process.env.PORT || 4444;

//middleware
app.use(express.static(__dirname + '/app/'));
app.use(bodyParser.json());

//mongoose connection
mongoose.connect('mongodb://localhost/feastly');

//connects app and port
app.listen(port);
//adds favorites
app.post('/api/favorites', function(req, res) {
  favoritesdb.create({
    favorite: req.body.favorite
  }, function(err, favorite) {
    res.send('success');
  });
});

//handles register
app.post('/api/register', function(req,res){
  userdb.create({
    username: req.body.username,
    password: req.body.password
  }, function(err, user){
    res.send(user);
  });

});

//handles login
app.post('/api/login', function(req,res){
  userdb.findOne({username:req.body.username}, function(err, user){
    if (err){
      res.send(err);
    } else if(user){
      if(req.body.password === user.password){
        res.send('success');
      }
    } else {
      res.send('failure');
    }
  });

});

//prints sucess when the server is running
console.log('Server now listening on port: ', port);

//exports the app server
module.exports = app;
