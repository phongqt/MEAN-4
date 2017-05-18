var express = require('express');
var jwt = require('jsonwebtoken');

var reslt = require('../models/result');
var constSys = require('../constants/constant');
var router = express.Router();

var Employee = require('../config/employee');
var User = require('../config/user');
var config = require('../constants/config');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

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
                    expiresIn: 86400
                });

                let result = successResp(token);
                resp.json(result);
            }
        }
    });
});

/* Api for user*/
router.get('/user', checkAuthentication, function (req, resp, next) {
    let page = req.query.page || 1;
    let limit = req.query.limit || constSys.limit;
    let skip = (page - 1) * limit;
    User.find().sort('UserName').skip(parseInt(skip)).limit(parseInt(limit)).exec(function (err, users) {
        if (err) return handleError(resp, err);
        User.count().exec(function (err, count) {
            let data = reslt.dataPaging;
            data.data = users;
            data.totalItems = count;
            let res = successResp(data);
            return resp.send(res);
        });
    })
});

router.post('/user', checkAuthentication, function (req, resp, next) {
    let model = req.body;
    let user = new User({
        UserName: model.UserName,
        Password: model.Password,
        FirstName: model.FirstName,
        LastName: model.LastName,
        Address: model.Address,
        Avatar: model.Avatar,
        Email: model.Email,
        Role: 1
    });
    User.findOne({ $or: [{ 'UserName': user.UserName }, { 'Email': user.Email }] }, function (err, data) {
        if (err) return handleError(resp, err);
        if (data) {
            return handleError(resp, "User name or Email existed.");
        }
        user.save(function (err) {
            if (err) return handleError(resp, err);
            let result = successResp(null);
            return resp.json(result);
        });
    });
});

router.get('/user/:id', checkAuthentication, function (req, resp, next) {
    User.findById(req.params['id'], function (err, data) {
        if (err) return handleError(resp, err);
        let result = successResp(data);
        return resp.json(result);
    });
});

router.delete('/user/:id', checkAuthentication, function (req, resp, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return handleError(resp, err);
        User.remove(user, function (err, data) {
            if (err) return handleError(resp, err);
            let res = successResp(null);
            return resp.send(res);
        });
    });
});

router.put('/user/:id', checkAuthentication, function (req, resp, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return handleError(resp, err);
        let model = req.body;
        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Address = model.Address;
        user.save(function (err, userUpdate) {
            if (err) return handleError(resp, err);
            let res = successResp(userUpdate);
            return resp.send(res);
        });
    });
});

router.get('/profile', checkAuthentication, function (req, resp, next) {
    console.log(req.decode._doc);
    next();
});

/* Api for employ */
router.get('/employ', checkAuthentication, function (req, resp, next) {
    let page = req.query.page || 1;
    let limit = req.query.limit || constSys.limit;
    let skip = (page - 1) * limit;
    Employee.find().sort('EmployeeName').skip(parseInt(skip)).limit(parseInt(limit)).exec(function (err, employees) {
        if (err) return handleError(resp, err);
        Employee.count().exec(function (err, count) {
            let data = reslt.dataPaging;
            data.data = employees;
            data.totalItems = count;
            let res = successResp(data);
            return resp.send(res);
        });
    })
});

router.get('/employ/:id', checkAuthentication, function (req, resp, next) {
    getEmployeeById(req.params.id, function (employee) {
        let res = successResp(employee);
        return resp.send(res);
    });
});

router.put('/employ/:id', checkAuthentication, function (req, resp, next) {
    getEmployeeById(req.params.id, function (employee) {
        let model = req.body;
        employee.EmployeeName = model.EmployeeName;
        employee.Designation = model.Designation;
        employee.Skills = model.Skills;
        Employee.findOne({ EmployeeName: employee.EmployeeName }, function (err, obj) {
            if (!obj || obj._id == req.params.id) {
                employee.save(function (err, updateEmployee) {
                    if (err) return handleError(resp, err);
                    let res = successResp(updateEmployee);
                    return resp.send(res);
                });
            } else {
                return handleError(resp, "Employee existed!");
            }
        });
    });
});

router.post('/employ', checkAuthentication, function (req, resp, next) {
    let data = req.body;
    Employee.findOne({ EmployeeName: data.EmployeeName }, function (err, obj) {
        if (!obj) {
            let employModel = new Employee({
                EmployeeName: data.EmployeeName,
                Skills: data.Skills,
                Designation: data.Designation,
                Project: data.Project
            });
            Employee.insertMany(employModel, function (err, data) {
                if (err) return handleError(resp, err);
                let res = successResp(data);
                return resp.send(res);
            })
        } else {
            return handleError(resp, "Employee existed!");
        }
    });

});

router.delete('/employ/:id', checkAuthentication, function (req, resp, next) {
    getEmployeeById(req.params.id, function (employee) {
        Employee.remove(employee, function (err, data) {
            if (err) return handleError(resp, err);
            let res = successResp(null);
            return resp.send(res);
        });
    });
});

/* File handle */ 
router.post('/file-upload/profile', upload.single('avatar'), function(req, resp, next) {
    console.log(req);
    next();
});

function getEmployeeById(id, callback) {
    Employee.findById(id, function (err, employee) {
        if (err) return handleError(err);
        if (typeof callback === "function") {
            return callback(employee);
        }
    });
}

function handleError(resp, error) {
    let resul = errorResp(error);
    return resp.json(resul);
}

function successResp(data) {
    let result = reslt.result;
    result.success = true;
    result.message = "success!";
    result.data = data;
    return result;
}

function errorResp(message) {
    let result = reslt.result;
    result.success = false;
    result.message = message;
    result.data = null;
    return result;
}

/* For authentication */
function checkAuthentication(request, response, next) {
    let path = request.path;
    let token = request.headers['authorization'];
    if (token) {
        jwt.verify(token, "superSecret", function (err, decode) {
            if (err) {
                return response.status(401).send({ success: false, message: 'Failed to authenticate token.' });
            }

            request.decode = decode;
            return next();
        });
    } else {
        return response.status(403).send({
            success: false,
            message: 'No token provided.',
            data: null
        })
    }
}

module.exports = router;   