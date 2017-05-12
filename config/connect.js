var mongoose = require('mongoose');
var config = require('../constants/config');

var db = config.database;
var connect = mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    }
});

module.exports = connect;