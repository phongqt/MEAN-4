var express=require('express');  
var path=require('path');  
var bodyParser=require('body-parser');  
  
var index=require('./routes/index');  
var api=require('./routes/api');  
  
var port=4500;  
var app=express();  
  
app.set('view engine','ejs');  
app.set('views',path.join(__dirname,'/mean-client'));  
  
// define the view engine and set the path for views files  
  
app.engine('html',require('ejs').renderFile);  
//Register given template engine callbac function as extension  
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(path.join(__dirname,'/mean-client')));  
  
// Defien the path for the static files like image, css and js files  
  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended:false}));  
// Define the middleware to parse the data from URL request and requesy body  
  
app.use('/',index);  
app.use('/api',api);  
app.use('*',index);  

// define the middleware for routing  
  
app.listen(port,function(){  
    console.log('Server Started At '+port);  
})  