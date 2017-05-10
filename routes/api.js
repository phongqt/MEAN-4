var express = require('express');
var result = require('../models/result.js');
var router = express.Router();

var Employee = require('../database/dataFile');

router.get('/', function (req, resp, next) {
    Employee.find({}, function (err, employee) {
        resp.send(employee);
    })
});

router.get('/employ/:id', function (req, resp, next) {
    Employee.findById(req.params.id, function (err, employee) {
        resp.send(employee);
        console.log(employee);
    });
});

router.put('/employ/:id', function (req, resp, next) {
    Employee.findById(req.params.id, function (err, updateEmployee) {
        if (!err) {
            var model = req.body;
            updateEmployee.EmployeeName = model.EmployeeName;
            updateEmployee.Designation = model.Designation;
            updateEmployee.Skills = model.Skills;
            updateEmployee.save(function (err, updateEmployee) {
                if (err) return handleError(err);
                result.success = true;
                result.message = "success!";
                result.data = updateEmployee;
                resp.send(result);
            });
        }
    });
})

function handleError(error) {

}

module.exports = router;   