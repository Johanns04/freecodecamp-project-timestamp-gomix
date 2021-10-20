// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//The Body of the API
app.get("/api/:date?", (req, res)=>{
  var jsonapiDate = {
        'unix': '',
        'utc': ''
    };
  var errorMessage = { 'error' : 'Invalid Date'};

  if(!Boolean(req.params.date)){
    var today = new Date();
    jsonapiDate.unix = today.getTime();
    jsonapiDate.utc = today.toUTCString();
  }else{
    var apiDate = req.params.date.toString();
    var something = new Date(apiDate);
    var isitnum = new Date(Number(apiDate));

    if(something != 'Invalid Date' || isitnum != 'Invalid Date'){

      var apiDateNum;
      if(isitnum != 'Invalid Date'){
          apiDateNum = Number(apiDate);
      }else{
          apiDateNum = Number(Date.parse(apiDate));
      }
  
      var apiDateObj = new Date(apiDateNum);
      jsonapiDate.unix = apiDateObj.getTime();
      jsonapiDate.utc = apiDateObj.toUTCString();

    }else{
      jsonapiDate = errorMessage;
    }
  }
  res.json(jsonapiDate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
