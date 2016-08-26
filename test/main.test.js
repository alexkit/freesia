var http = require('http');
var fs = require('fs');
var main = require('../app/main');
var data = fs.readFileSync('./test/resources/matcher/00_queryAddressRequest_02.xml', 'utf8');

// An object of options to indicate where to post to
var post_options = {
    host: '127.0.0.1',
    port: '8080',
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/xml',
        'Content-Length': Buffer.byteLength(data)
    }
};

// Set up the request
var post_req = http.request(post_options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});

// post the data
post_req.write(data);
post_req.end();


