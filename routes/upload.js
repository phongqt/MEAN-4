var express = require('express');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var router = express.Router();

router.get('/avatar/:filename', function (req, resp, next) {
    return resp.sendFile(appDir + '/uploads/' + req.params["filename"]);
});

module.exports = router;   