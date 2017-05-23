var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var connect = require('./config/connect');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');


var index = require('./routes/index');
var api = require('./routes/api');
var upload = require('./routes/upload');

var port = 4500;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-By,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', api);

app.use('/uploads', upload);

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