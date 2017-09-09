// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var getIP = require('ipware')().get_ip;
var accepts = require('accepts');
var parse = require('user-agent-parser');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function(req, res) {
  var accept = accepts(req);
  var os = parse(req.headers["user-agent"]).os;
  res.json({
    ipaddress: getIP(req).clientIp
  , language: accept.languages()[0]
  , software: os
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
