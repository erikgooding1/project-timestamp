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
  if(dateParam.match(/^\d{4}-\d{2}-\d{2}/)) {
    const newDate = new Date(dateParam);
    let utcString = newDate.toUTCString();
    let unixNum = newDate.getTime();
    let retJson = {unix: unixNum, utc: utcString}
    res.json(retJson);
  } else {
    let unixNum = Number(dateParam);
    const newDate = new Date(unixNum);
    let utcString = newDate.toUTCString();
    let retJson = {unix: unixNum, utc: utcString}
    res.json(retJson);
  }
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
