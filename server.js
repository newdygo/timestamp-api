
var express = require('express');
var urll = require('url');
var app = express();

app.route('/:time').get(function (req, res) {
  
  var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  var pathname = urll.parse(req.url, true).pathname.replace('/', '');
  
  if (/^\d+$/.test(pathname)) {
    
    var time = new Date(pathname * 1000);
    
    var year = time.getFullYear();
    var month = monthNames[time.getMonth()];
    var day = time.getDay();
    
    var result = {
      
      unix: time.getTime(),
      natural : month + ' ' + day + ', ' + year
    };
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end();
  }
  else {
    
    var clearp = pathname.split('%');
    
    if (clearp.length > 2) {
      
      var year = clearp[2];
      var month = monthNames.indexOf(clearp[0]);
      var day = clearp[1];
      
      var time = new Date(year, month, day);
      
      var result = {
      
        unix: time.getTime(),
        natural : clearp[0] + ' ' + day + ', ' + year
      };
      
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(result));
      res.end();
    }
  }
});

app.listen(8080);