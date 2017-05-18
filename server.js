var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var connect = require('./config/connect');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var api = require('./routes/api');

var port = 4500;
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/mean-client'));


app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, '/mean-client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(function (request, response, next) {     
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-By,content-type, Authorization');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', index);
app.use('/api', api);
app.use('*', index);

// define the middleware for routing  

app.listen(port, function () {
    console.log('Server Started At ' + port);
})  

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      throw new Error();
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      throw new Error();
    default:
      throw error;
  }
};

app.on('error', onError);