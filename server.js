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

// define the view engine and set the path for views files  

app.engine('html', require('ejs').renderFile);
//Register given template engine callbac function as extension  
app.use(function (req, res, next) {  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-By,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(path.join(__dirname, '/mean-client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Define the middleware to parse the data from URL request and requesy body  

app.use(morgan('dev'));

app.use('/', index);

app.use(function (request, response, next) {
    let path = request.path;     
    if (path !== '/api/authenticate' && path != '/api/signup') {
        var token = request.headers['authorization'];  
         console.log(request.headers);
        if (token) {
            
            jwt.verify(token,"superSecret", function(err, decode) {
               
                if (err)  return response.json({ success: false, message: 'Failed to authenticate token.' });
                request.decode = decode;
                console.log(decode);
                next();
            });
        } else {
           return response.status(403).send({
                success : false,
                message : 'No token provided.',
                data : null
            })
        }
    }

    next();
});
app.use('/api', api);
app.use('*', index);

// define the middleware for routing  

app.listen(port, function () {
    console.log('Server Started At ' + port);
})  