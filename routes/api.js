var express = require('express');
var jwt = require('jsonwebtoken');

var reslt = require('../models/result');
var constSys = require('../constants/constant');
var router = express.Router();

var Employee = require('../config/employee');
var User = require('../config/user');
var config = require('../constants/config');

router.post('/authenticate', function (req, resp, next) {
    var model = req.body;
    User.findOne({ UserName: model.UserName }, function (err, data) {
        if (err) throw err;
        if (!data) {
            let err = errorResp("Authentication failed. User not found.");
            resp.json(err);
        } else {
            if (data.Password != model.Password) {
                let err = errorResp("Authentication failed. Password incorrect.");
                resp.json(err);
            } else {
                let token = jwt.sign(data, 'superSecret', {
                    expiresIn: 1440
                });

                let result = successResp(token);
                resp.json(result);
            }
        }
    });
});

/* Api for user*/
router.post('/sigup', function (req, resp, next) {
    var model = req.body;
    var user = new User({
        UserName: model.UserName,
        Password: model.Password,
        Role: 1
    });

    user.save(function(err) {
        if (err) return handleError(err);
        let result = successResp(null);
        resp.json(result);
    });
});

/* Api for employ */
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
            var employModel = new Employee({
                EmployeeName: data.EmployeeName,
                Skills: data.Skills,
                Designation: data.Designation,
                Project: data.Project
            });
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