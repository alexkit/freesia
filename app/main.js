var http = require("http");
var matcher = require("./matcher");
var scenarioData = require("./resources/scenario_data.json");

http.createServer(function (request, response) {

    request.on('data', function (chunk) {
        var result = matcher.findMatch(chunk.toString(), scenarioData);
        //TODO pass result to the engine module for execution
        console.log(result.stepID);
    });

    request.on('end', function () {
        // empty 200 OK response for now
        response.writeHead(200, "OK", {'Content-Type': 'text/html'});
        response.end();
    });

}).listen(8080);

console.log("Server Running on 8080");
