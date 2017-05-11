var express = require('express');
var reslt = require('../models/result');
var constSys = require('../constants/constant');
var router = express.Router();

var Employee = require('../database/dataFile');
var employModel = require('../models/employee');

router.get('/employ', function (req, resp, next) {
    let page = req.query.page || 1;
    let limit = req.query.limit || constSys.limit;
    let skip = (page - 1) * limit;
    Employee.find().sort('EmployeeName').skip(parseInt(skip)).limit(parseInt(limit)).exec(function (err, employees) {
        if (err) return handleError(err);
        Employee.count().exec(function (err, count) {
            var data = reslt.dataPaging;
            data.data = employees;
            data.totalItems = count;
            var res = successResp(data);
            resp.send(res);
        });
    })
});

router.get('/employ/:id', function (req, resp, next) {
    getEmployeeById(req.params.id, function (employee) {
        var res = successResp(employee);
        resp.send(res);
    });
});

router.put('/employ/:id', function (req, resp, next) {
    getEmployeeById(req.params.id, function (employee) {
        var model = req.body;
        employee.EmployeeName = model.EmployeeName;
        employee.Designation = model.Designation;
        employee.Skills = model.Skills;
        Employee.findOne({ EmployeeName: employee.EmployeeName }, function (err, obj) {
            if (!obj || obj._id == req.params.id) {
                employee.save(function (err, updateEmployee) {
                    if (err) return handleError(err);
                    var res = successResp(updateEmployee);
                    resp.send(res);
                });
            } else {
                var res = errorResp("Employee existed!");
                resp.send(res);
            }
        });
    });
});

router.post('/employ', function (req, resp, next) {
    var data = req.body;
    Employee.findOne({ EmployeeName: data.EmployeeName }, function (err, obj) {
        if (!obj) {
            employModel.EmployeeName = data.EmployeeName;
            employModel.Skills = data.Skills;
            employModel.Designation = data.Designation;
            employModel.Project = data.Project;
            Employee.insertMany(employModel, function (err, data) {
                if (err) return handleError(err);
                var res = successResp(data);
                resp.send(res);
            })
        } else {
            var res = errorResp("Employee existed!");
            resp.send(res);
        }
    });

});

router.delete('/employ/:id', function (req, resp, next) {
    getEmployeeById(req.params.id, function (employee) {
        Employee.remove(employee, function (err, data) {
            if (err) return handleError(err);
            var res = successResp(null);
            resp.send(res);
        });
    });
});

function getEmployeeById(id, callback) {
    Employee.findById(id, function (err, employee) {
        if (err) return handleError(err);
        if (typeof callback === "function") {
            return callback(employee);
        }
    });
}

function handleError(error) {

}

function successResp(data) {
    var result = reslt.result;
    result.success = true;
    result.message = "success!";
    result.data = data;
    return result;
}

function errorResp(message) {
    var result = reslt.result;
    result.success = false;
    result.message = message;
    result.data = null;
    return result;
}

module.exports = router;   