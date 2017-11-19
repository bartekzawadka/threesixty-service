'use strict';

module.exports = {
    sendError: function (res, errorCode, error) {
        if (!errorCode) {
            errorCode = 400;
        }

        var msg = error;

        if (error && error.message) {
            msg = error.message;
        }

        res.writeHead(errorCode, msg, {'content-type': 'text/plain'});
        res.end(msg);
    },
    sendJson: function (res, data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
};