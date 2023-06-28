// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  let dateParam = req.params.date;
  if(!isNaN(dateParam)) {
    let parsedDate = Number(dateParam);
    const dateObj = new Date(parsedDate);
    let utcString = dateObj.toUTCString();
    let retJson = { unix: parsedDate, utc: utcString }
    res.json(retJson);
  } else {
    let parsedDate = Date.parse(dateParam);
    if(parsedDate) {
      const dateObj = new Date(parsedDate);
      let utcString = dateObj.toUTCString();
      let retJson = { unix: parsedDate, utc: utcString }
      res.json(retJson);
    } else {
      let retJson = { error: "Invalid Date" }
      res.json(retJson);
    }
  }
})

app.get("/api", (req, res) => {
  let currentDate = new Date();
  let utcString = currentDate.toUTCString();
  let unixNum = currentDate.getTime();
  let retJson = { unix: unixNum, utc: utcString }
  res.json(retJson);
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
