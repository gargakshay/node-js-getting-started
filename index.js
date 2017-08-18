var express = require('express');
var path = require('path');
var index = require('./routes/index');
var app = express();

app.set('port', (process.env.PORT || 4000));

// app.use(express.static(__dirname + '/angular/dist'));
app.use(express.static(path.join(__dirname, 'angular/dist/')));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');


app.use('/', index);

app.get('/', function(request, response) {
  // response.render('pages/index');
  response.send("hello1222323S");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
