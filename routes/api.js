var express = require('express');
var router = express.Router();

var Employee = require('../database/dataFile');

router.get('/', function (req, resp, next) {
    Employee.find({}, function (err, docs) {
        resp.send(docs);
    })
});

router.get('/employ/:id', function (req, resp, next) {
    Employee.findById(req.params.id, function (err, docs) {
        resp.send(docs);
        console.log(docs);
    });
});

module.exports = router;   